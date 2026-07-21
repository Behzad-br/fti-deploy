const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config();

const User = require('../models/User');
const Enquiry = require('../models/Enquiry');
const connectDB = require('../config/db');

// Check arguments
const isDryRun = process.argv.includes('--dry-run');

const migrateData = async () => {
    try {
        console.log(`Starting JSON to MongoDB migration... ${isDryRun ? '[DRY RUN MODE]' : ''}`);
        await connectDB();

        let stats = {
            users: { read: 0, migrated: 0, skipped: 0, rejected: 0 },
            enquiries: { read: 0, migrated: 0, skipped: 0, rejected: 0 }
        };

        // 1. Migrate Users
        const usersPath = path.join(__dirname, '../data/users.json');
        if (fs.existsSync(usersPath)) {
            console.log('Found users.json, migrating...');
            const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
            stats.users.read = usersData.length;
            
            for (const userData of usersData) {
                if (!userData.email || !userData.name || !userData.password) {
                    stats.users.rejected++;
                    continue;
                }

                const exists = await User.findOne({ email: userData.email });
                if (!exists) {
                    let finalPassword = userData.password;
                    let isHashed = finalPassword.startsWith('$2') && finalPassword.length === 60;
                    if (!isHashed && !isDryRun) {
                        const salt = await bcrypt.genSalt(10);
                        finalPassword = await bcrypt.hash(finalPassword, salt);
                    }

                    if (!isDryRun) {
                        await User.collection.insertOne({
                            name: userData.name,
                            email: userData.email,
                            password: finalPassword,
                            role: userData.role || 'student',
                            status: 'active',
                            createdAt: new Date(),
                            updatedAt: new Date()
                        });
                    }
                    stats.users.migrated++;
                } else {
                    stats.users.skipped++;
                }
            }
        } else {
            console.log('No users.json found, skipping...');
        }

        // 2. Migrate Enquiries
        const enquiriesPath = path.join(__dirname, '../data/enquiries.json');
        if (fs.existsSync(enquiriesPath)) {
            console.log('Found enquiries.json, migrating...');
            const enquiriesData = JSON.parse(fs.readFileSync(enquiriesPath, 'utf8'));
            stats.enquiries.read = enquiriesData.length;

            for (const enquiryData of enquiriesData) {
                if (!enquiryData.name || !enquiryData.targetCountry || !enquiryData.phone) {
                    stats.enquiries.rejected++;
                    continue;
                }

                const exists = await Enquiry.findOne({ 
                    email: enquiryData.email || '', 
                    name: enquiryData.name, 
                    message: enquiryData.message || '' 
                });
                if (!exists) {
                    if (!isDryRun) {
                        await Enquiry.create({
                            name: enquiryData.name,
                            phone: String(enquiryData.phone),
                            email: enquiryData.email || '',
                            address: enquiryData.address || '',
                            currentQualification: enquiryData.currentQualification || '',
                            targetCountry: enquiryData.targetCountry,
                            message: enquiryData.message || '',
                            createdAt: enquiryData.createdAt ? new Date(enquiryData.createdAt) : Date.now()
                        });
                    }
                    stats.enquiries.migrated++;
                } else {
                    stats.enquiries.skipped++;
                }
            }
        } else {
            console.log('No enquiries.json found, skipping...');
        }

        console.log('\n--- Migration Report ---');
        console.table(stats);
        if (isDryRun) {
            console.log('\nDry run finished. No data was modified.');
        } else {
            console.log('\nMigration finished successfully!');
        }
        
        return stats;
    } catch (error) {
        console.error('Migration failed:', error);
        throw error;
    }
};

if (require.main === module) {
    migrateData().then(() => process.exit(0)).catch(() => process.exit(1));
}

module.exports = { migrateData };

