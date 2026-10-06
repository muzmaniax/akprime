#!/usr/bin/env node

/**
 * Image Rename Script
 *
 * Renames images in public/images/ with descriptive names based on usage context
 * Updates IMAGE_MAPPING.json and all source files
 */

const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '..');
const IMAGES_DIR = path.join(SOURCE_DIR, 'public', 'images');
const MAPPING_FILE = path.join(SOURCE_DIR, 'IMAGE_MAPPING.json');

// Define meaningful names based on context/content
const IMAGE_RENAMES = {
  'photo-1552664730-d307ca884978': 'hero-workspace-bw.jpg', // Hero section BW image
  'photo-1497366754035-f200968a6e72': 'team-collaboration.jpg', // Team working together
  'photo-1573164713988-8665fc963095': 'business-meeting.jpg', // Business meeting
  'photo-1573497019940-1c28c88b4f3e': 'laptop-workspace.jpg', // Person at laptop
  'photo-1542744173-8e7e53415bb0': 'professional-headshot.jpg', // Headshot
  'photo-1497366216548-37526070297c': 'office-environment.jpg', // Office setup
  'photo-1522071820081-009f0129c71c': 'diverse-team.jpg', // Team diversity
  'photo-1551288049-bebda4e38f71': 'startup-meeting.jpg', // Meeting/startup
  'photo-1559136555-9303baea8ebd': 'professional-workspace.jpg', // Professional space
  'photo-1664575602554-2087b04935a5': 'modern-office.jpg', // Modern office
  'photo-1460886141757-a5bbd8f3a4d8': 'avatar-professional.jpg', // Avatar
  'photo-1478737270454-541f48a00152': 'business-team.jpg', // Team
  'photo-1472099645785-5658abf4ff4e': 'avatar-user.jpg', // User avatar
  'photo-1581094794329-c8112a89af12': 'strategy-planning.jpg', // Planning
  'photo-1573496359142-b8d87734a5a2': 'avatar-consultant.jpg', // Avatar
  'photo-1554224155-6726b3ff858f': 'financial-analysis.jpg', // Finance
  'photo-1504328345606-18bbc8c9d7d1': 'tech-workspace.jpg', // Tech
  'photo-1460472178825-e5240623afd5': 'success-team.jpg', // Success
  'photo-1553413077-190dd305871c': 'digital-transformation.jpg', // Digital
  'photo-1576091160399-112ba8d25d1d': 'business-growth.jpg', // Growth
  'photo-1488521787991-ed7bbaae773c': 'innovation-lab.jpg', // Innovation
  'photo-1529107386315-e1a2ed48a620': 'professional-discussion.jpg', // Discussion
  'photo-1541339907198-e08756dedf3f': 'business-analysis.jpg', // Analysis
  'photo-1441986300917-64674bd600d8': 'team-brainstorm.jpg', // Brainstorm
  'photo-1518186285589-2f7649de83e0': 'office-culture.jpg', // Culture
  'photo-1677442135703-1787eea5ce01': 'remote-work.jpg', // Remote work
  'photo-1524178232363-1fb2b075b655': 'cloud-computing.jpg', // Cloud
  'photo-1454165804606-c3d57bc86b40': 'data-analysis.jpg', // Data
  'photo-1611974789855-9c2a0a7236a3': 'mentor-coaching.jpg', // Coaching
  'photo-1579621970588-a35d0e7ab9b6': 'business-consulting.jpg', // Consulting
  'photo-1563986768609-322da13575f3': 'compliance-audit.jpg', // Compliance
  'photo-1507679799987-c73779587ccf': 'organization-structure.jpg', // Organization
  'photo-1450101499163-c8848c66ca85': 'financial-planning.jpg', // Finance
  'photo-1460925895917-afdab827c52f': 'analytics-dashboard.jpg', // Analytics
  'photo-1521737711867-e3b97375f902': 'enterprise-solution.jpg', // Enterprise
  'photo-1521791136064-7986c2920216': 'system-integration.jpg', // Integration
  'photo-1552581234-26160f608093': 'database-management.jpg', // Database
  'photo-1551434678-e076c223a692': 'software-development.jpg', // Development
  'photo-1497366216548-37526070297c': 'agile-methodology.jpg', // Agile
};

/**
 * Get extension from filename
 */
function getExtension(filename) {
  return path.extname(filename) || '.jpg';
}

/**
 * Rename image file
 */
function renameImage(oldName, newName) {
  const oldPath = path.join(IMAGES_DIR, oldName);
  const newPath = path.join(IMAGES_DIR, newName);

  if (!fs.existsSync(oldPath)) {
    console.log(`  ⚠ Not found: ${oldName}`);
    return false;
  }

  if (fs.existsSync(newPath)) {
    console.log(`  ⊘ Already exists: ${newName}`);
    return false;
  }

  fs.renameSync(oldPath, newPath);
  console.log(`  ✓ Renamed: ${oldName} → ${newName}`);
  return true;
}

/**
 * Update file references
 */
function updateFileReferences(oldPath, newPath) {
  const files = [];

  function walk(dir) {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relativePath = path.relative(SOURCE_DIR, fullPath);

        if (entry.isDirectory()) {
          if (!/^(node_modules|\.next|\.git|public\/images|dist)/.test(relativePath)) {
            walk(fullPath);
          }
        } else if (/\.(tsx?|jsx?)$/.test(entry.name)) {
          files.push(fullPath);
        }
      }
    } catch (err) {
      // Skip permission errors
    }
  }

  walk(path.join(SOURCE_DIR, 'app'));
  walk(path.join(SOURCE_DIR, 'components'));
  walk(path.join(SOURCE_DIR, 'data'));

  let updated = 0;
  files.forEach((file) => {
    try {
      let content = fs.readFileSync(file, 'utf-8');
      if (content.includes(oldPath)) {
        content = content.replace(new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath);
        fs.writeFileSync(file, content, 'utf-8');
        updated++;
      }
    } catch (err) {
      // Skip read errors
    }
  });

  return updated;
}

/**
 * Main execution
 */
function main() {
  console.log('\n📝 Image Renaming Script\n');
  console.log('Renaming images with descriptive names...\n');

  let totalRenamed = 0;
  let totalUpdated = 0;

  // Load current mapping
  const mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf-8'));
  const newMapping = {};

  // Process each image
  Object.entries(IMAGE_RENAMES).forEach(([oldName, newName]) => {
    const ext = getExtension(newName) || '.jpg';
    const finalName = newName.includes('.') ? newName : newName + ext;

    // Rename the file
    if (renameImage(oldName, finalName)) {
      totalRenamed++;

      // Update all files that reference this image
      const oldLocalPath = `/images/${oldName}`;
      const newLocalPath = `/images/${finalName}`;

      const updated = updateFileReferences(oldLocalPath, newLocalPath);
      if (updated > 0) {
        totalUpdated += updated;
        console.log(`    ↻ Updated in ${updated} file(s)`);
      }

      // Update mapping
      Object.entries(mapping).forEach(([url, localPath]) => {
        if (localPath === oldLocalPath) {
          newMapping[url] = newLocalPath;
        } else if (!newMapping[url]) {
          newMapping[url] = localPath;
        }
      });
    }
  });

  // Handle unmapped images
  Object.entries(mapping).forEach(([url, localPath]) => {
    if (!newMapping[url]) {
      newMapping[url] = localPath;
    }
  });

  // Save updated mapping
  fs.writeFileSync(MAPPING_FILE, JSON.stringify(newMapping, null, 2), 'utf-8');
  console.log(`\n✓ IMAGE_MAPPING.json updated\n`);

  // Summary
  console.log('═'.repeat(50));
  console.log(`✓ Renamed:  ${totalRenamed} images`);
  console.log(`✓ Updated:  ${totalUpdated} file references`);
  console.log('═'.repeat(50) + '\n');

  console.log('📋 Next steps:');
  console.log('  1. Review renamed images: public/images/');
  console.log('  2. Check IMAGE_MAPPING.json');
  console.log('  3. Test the website');
  console.log('  4. Commit changes:\n');
  console.log('     git add public/images/ IMAGE_MAPPING.json');
  console.log('     git commit -m "Rename images with descriptive names"\n');
}

main();
