const express = require('express');
const path = require('path');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { spawn } = require('child_process');
const fs = require('fs').promises;
const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
let db;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gca_data';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Connect to MongoDB
async function connectToDatabase() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db('gca_data');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Fallback to file-based storage if MongoDB is unavailable
    console.log('Falling back to file-based storage');
  }
}

// Initialize database connection
connectToDatabase();

// API Routes

// Get all data types
app.get('/api/data', async (req, res) => {
  try {
    const data = await getAllData();
    res.json({
      success: true,
      data: data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch data',
      message: error.message
    });
  }
});

// Get GCA compatibility report (using different path to avoid conflicts)
app.get('/api/report', async (req, res) => {
  try {
    const report = await generateGCAReport();
    res.json({
      success: true,
      report: report,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating GCA report:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate GCA report',
      message: error.message
    });
  }
});

// Get specific data type
app.get('/api/data/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const validTypes = ['meetup_groups', 'climbing_gyms', 'university_programs', 'coworking_spaces'];
    
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid data type',
        validTypes: validTypes
      });
    }

    const data = await getDataByType(type);
    res.json({
      success: true,
      type: type,
      data: data,
      count: data.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error(`Error fetching ${req.params.type} data:`, error);
    res.status(500).json({
      success: false,
      error: `Failed to fetch ${req.params.type} data`,
      message: error.message
    });
  }
});

// Trigger data scraping
app.post('/api/scrape', async (req, res) => {
  try {
    const { types } = req.body; // Optional: specify which data types to scrape
    
    // Set scraping status
    await updateScrapeStatus('running', 'Data scraping initiated');
    
    // Run Python scraping script
    const result = await runPythonScraper(types);
    
    if (result.success) {
      await updateScrapeStatus('completed', 'Data scraping completed successfully');
      res.json({
        success: true,
        message: 'Data scraping completed successfully',
        data: result.data,
        timestamp: new Date().toISOString()
      });
    } else {
      await updateScrapeStatus('failed', result.error);
      res.status(500).json({
        success: false,
        error: 'Scraping failed',
        message: result.error
      });
    }
  } catch (error) {
    console.error('Error during scraping:', error);
    await updateScrapeStatus('failed', error.message);
    res.status(500).json({
      success: false,
      error: 'Scraping process failed',
      message: error.message
    });
  }
});

// Get scraping status
app.get('/api/scrape/status', async (req, res) => {
  try {
    const status = await getScrapeStatus();
    res.json({
      success: true,
      status: status,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching scrape status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch scrape status',
      message: error.message
    });
  }
});

// Database helper functions
async function getAllData() {
  if (db) {
    const collections = ['meetup_groups', 'climbing_gyms', 'university_programs', 'coworking_spaces'];
    const data = {};
    
    for (const collection of collections) {
      data[collection] = await db.collection(collection).find({}).toArray();
    }
    
    return data;
  } else {
    // Fallback to file-based storage
    return await getFileBasedData();
  }
}

async function getDataByType(type) {
  if (db) {
    return await db.collection(type).find({}).toArray();
  } else {
    // Fallback to file-based storage
    const allData = await getFileBasedData();
    return allData[type] || [];
  }
}

async function generateGCAReport() {
  const data = await getAllData();
  
  // Generate compatibility analysis
  const analysis = [];
  
  // Process each data type
  for (const [type, items] of Object.entries(data)) {
    if (Array.isArray(items)) {
      items.forEach(item => {
        const gcaScore = calculateGCAScore(type, item);
        analysis.push({
          type: type,
          name: item.name,
          location: item.address || item.location || item.institution,
          gca_score: gcaScore,
          target_demographic: getTargetDemographic(type, item),
          best_times: getOptimalTimes(type),
          weekly_frequency: getWeeklyFrequency(type)
        });
      });
    }
  }
  
  // Sort by GCA score
  analysis.sort((a, b) => b.gca_score - a.gca_score);
  
  return {
    top_10_locations: analysis.slice(0, 10),
    by_category: groupByCategory(analysis),
    optimal_schedule: generateOptimalSchedule(),
    success_metrics: getSuccessMetrics(),
    total_locations: analysis.length,
    data_freshness: new Date().toISOString()
  };
}

function calculateGCAScore(category, data) {
  const baseScores = {
    meetup_groups: 4.0,
    climbing_gyms: 4.2,
    university_programs: 4.1,
    coworking_spaces: 3.9
  };
  
  return baseScores[category] || 3.0;
}

function getTargetDemographic(category, data) {
  switch (category) {
    case 'meetup_groups':
      return `Members: ${data.member_count || 'Unknown'}, Category: ${data.category || 'Unknown'}`;
    case 'climbing_gyms':
      return data.membership_demographics || 'Climbing enthusiasts';
    case 'university_programs':
      return `${data.female_enrollment_pct || 50}% female enrollment`;
    case 'coworking_spaces':
      return data.industry_mix || 'Professional demographic';
    default:
      return 'Mixed demographic';
  }
}

function getOptimalTimes(category) {
  const timeMappings = {
    meetup_groups: 'Evening events 6-8pm, Weekend activities',
    climbing_gyms: 'Weekday evenings 6-8pm, Weekend mornings 10am-12pm',
    university_programs: 'Evening classes 6-9pm, Library study 7-10pm',
    coworking_spaces: 'Weekdays 10am-4pm, Networking events 5-7pm'
  };
  return timeMappings[category] || 'Weekday evenings';
}

function getWeeklyFrequency(category) {
  const frequencies = {
    meetup_groups: 'Weekly/Bi-weekly events',
    climbing_gyms: 'Daily access',
    university_programs: 'Multiple times per week',
    coworking_spaces: 'Daily access'
  };
  return frequencies[category] || 'Weekly';
}

function groupByCategory(analysis) {
  const categories = {};
  
  analysis.forEach(item => {
    if (!categories[item.type]) {
      categories[item.type] = [];
    }
    categories[item.type].push(item);
  });
  
  // Get top 3 for each category
  Object.keys(categories).forEach(category => {
    categories[category] = {
      top_3: categories[category].slice(0, 3),
      average_gca_score: categories[category].reduce((sum, item) => sum + item.gca_score, 0) / categories[category].length,
      total_locations: categories[category].length
    };
  });
  
  return categories;
}

function generateOptimalSchedule() {
  return {
    monday: { time: '6:30-8:30 PM', activity: 'RoKC Climbing', type: 'fitness' },
    tuesday: { time: '6:00-9:00 PM', activity: 'UMKC Library Study', type: 'university' },
    wednesday: { time: '7:00-9:00 PM', activity: 'WeWork Networking', type: 'coworking' },
    thursday: { time: '6:30-8:30 PM', activity: 'Sequence Climb', type: 'fitness' },
    friday: { time: '5:30-7:30 PM', activity: 'KC Women in Tech Meetup', type: 'meetup' },
    saturday: { time: '10:00 AM-12:00 PM', activity: 'Coffee near campus', type: 'university' },
    sunday: { time: '2:00-4:00 PM', activity: 'Study/work session', type: 'flexible' }
  };
}

function getSuccessMetrics() {
  return {
    weekly_interactions_target: 20,
    gca_filter1_pass_rate_target: 0.30,
    location_efficiency_target: 2.5,
    monthly_new_locations_target: 2,
    follow_up_rate_target: 0.20
  };
}

async function runPythonScraper(types = null) {
  return new Promise((resolve) => {
    const args = ['gca.py'];
    if (types && Array.isArray(types)) {
      args.push('--types', types.join(','));
    }
    args.push('--output', 'json');
    args.push('--mongodb-uri', MONGODB_URI);
    
    const pythonProcess = spawn('python', args);
    let output = '';
    let error = '';
    
    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });
    
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        try {
          const result = JSON.parse(output);
          resolve({ success: true, data: result });
        } catch (parseError) {
          resolve({ success: true, data: { message: 'Scraping completed', output: output } });
        }
      } else {
        resolve({ success: false, error: error || `Process exited with code ${code}` });
      }
    });
    
    pythonProcess.on('error', (err) => {
      resolve({ success: false, error: err.message });
    });
  });
}

async function updateScrapeStatus(status, message) {
  const statusData = {
    status: status,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  if (db) {
    await db.collection('scrape_metadata').replaceOne(
      { type: 'status' },
      { type: 'status', ...statusData },
      { upsert: true }
    );
  } else {
    // Fallback to file storage
    await fs.writeFile('scrape_status.json', JSON.stringify(statusData, null, 2));
  }
}

async function getScrapeStatus() {
  if (db) {
    const status = await db.collection('scrape_metadata').findOne({ type: 'status' });
    return status || { status: 'idle', message: 'No scraping activity', timestamp: new Date().toISOString() };
  } else {
    // Fallback to file storage
    try {
      const data = await fs.readFile('scrape_status.json', 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return { status: 'idle', message: 'No scraping activity', timestamp: new Date().toISOString() };
    }
  }
}

async function getFileBasedData() {
  try {
    const files = ['meetup_groups.json', 'climbing_gyms.json', 'university_programs.json', 'coworking_spaces.json'];
    const data = {};
    
    for (const file of files) {
      try {
        const content = await fs.readFile(file, 'utf8');
        const key = file.replace('.json', '');
        data[key] = JSON.parse(content);
      } catch (error) {
        console.log(`File ${file} not found, using empty array`);
        data[file.replace('.json', '')] = [];
      }
    }
    
    return data;
  } catch (error) {
    console.error('Error reading file-based data:', error);
    return {
      meetup_groups: [],
      climbing_gyms: [],
      university_programs: [],
      coworking_spaces: []
    };
  }
}

// Static file serving (existing routes)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Middleware to remove .html extension
app.use((req, res, next) => {
  if (req.path.indexOf('.') === -1 && !req.path.startsWith('/api')) {
    const file = path.join(__dirname, `${req.path}.html`);
    res.sendFile(file, (err) => {
      if (err) {
        next();
      }
    });
  } else {
    next();
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  console.log('API endpoints available:');
  console.log('  GET  /api/data - Get all data');
  console.log('  GET  /api/data/:type - Get specific data type');
  console.log('  GET  /api/data/report - Get GCA compatibility report');
  console.log('  POST /api/scrape - Trigger data scraping');
  console.log('  GET  /api/scrape/status - Get scraping status');
});
