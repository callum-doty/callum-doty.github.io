# GCA Backend & Data Scraping System

A complete backend solution for hosting and managing the GCA (Goal-Compatibility Assessment) methodology framework with live data scraping from Kansas City locations.

## 🏗️ Architecture

- **Frontend**: GitHub Pages (gca.html)
- **Backend**: Node.js/Express server with API endpoints
- **Database**: MongoDB Atlas (free tier)
- **Scraping**: Python script with Kansas City demographic data
- **Deployment**: Railway/Render (free tier)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Python 3.8+
- MongoDB Atlas account (free)
- Railway or Render account (free)

### Local Development

1. **Clone and Install Dependencies**
   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
   
   # Install Node.js dependencies
   npm install
   
   # Install Python dependencies
   pip install -r requirements.txt
   ```

2. **Set Up MongoDB Atlas**
   - Create a free MongoDB Atlas account
   - Create a new cluster
   - Get your connection string
   - Create a `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gca_data
   PORT=3000
   ```

3. **Test the Python Scraper**
   ```bash
   python gca.py --output json
   ```

4. **Start the Backend Server**
   ```bash
   npm start
   ```

5. **Test the API**
   - Visit `http://localhost:3000/api/data`
   - Should return JSON with scraped data

6. **Test the Frontend**
   - Open `gca.html` in your browser
   - Go to "Live Data Dashboard" tab
   - Enter `http://localhost:3000` as Backend URL
   - Click "Test Connection"

## 🌐 Deployment

### Option 1: Railway (Recommended)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy from GitHub**
   - Connect your GitHub repository
   - Railway will auto-detect Node.js project
   - Add environment variables:
     ```
     MONGODB_URI=your_mongodb_connection_string
     PORT=3000
     ```

3. **Install Python Dependencies**
   - Railway should automatically detect `requirements.txt`
   - If not, add a build script to `package.json`:
   ```json
   "scripts": {
     "build": "pip install -r requirements.txt",
     "start": "node server.js"
   }
   ```

4. **Get Your Deployment URL**
   - Railway will provide a URL like `https://your-app.railway.app`
   - Update this URL in your GitHub Pages `gca.html`

### Option 2: Render

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Connect your GitHub repository
   - Choose "Web Service"
   - Build Command: `pip install -r requirements.txt && npm install`
   - Start Command: `npm start`

3. **Add Environment Variables**
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Deploy**
   - Render will provide a URL like `https://your-app.onrender.com`

## 📊 API Endpoints

### Data Retrieval
- `GET /api/data` - Get all scraped data
- `GET /api/data/:type` - Get specific data type
  - Types: `meetup_groups`, `climbing_gyms`, `university_programs`, `coworking_spaces`
- `GET /api/data/report` - Get GCA compatibility report

### Data Scraping
- `POST /api/scrape` - Trigger fresh data scraping
- `GET /api/scrape/status` - Check scraping status

### Example API Usage

```javascript
// Test connection
const response = await fetch('https://your-backend.railway.app/api/data');
const data = await response.json();

// Trigger scraping
const scrapeResponse = await fetch('https://your-backend.railway.app/api/scrape', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({})
});
```

## 🐍 Python Scraper Usage

The `gca.py` script can be used standalone or via the API:

```bash
# Run all scraping with SQLite (default)
python gca.py

# Run with MongoDB
python gca.py --output mongodb --mongodb-uri "your_connection_string"

# Run specific data types only
python gca.py --types "meetup_groups,climbing_gyms"

# Output JSON for API consumption
python gca.py --output json
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB Atlas connection string | Yes |
| `PORT` | Server port (default: 3000) | No |

### MongoDB Collections

The system creates these collections automatically:
- `meetup_groups` - Kansas City meetup data
- `climbing_gyms` - Climbing facility information
- `university_programs` - Graduate program demographics
- `coworking_spaces` - Professional workspace data
- `scrape_metadata` - Scraping status and timestamps

## 🎯 Data Sources

The scraper collects data from:

1. **Meetup Groups** (Static data based on research)
   - Kansas City Women in Technology
   - Ropes KC Indoor Rock Climbing
   - Kansas City Adventure Club
   - Explorer Chicks of Kansas City
   - Big Data KC

2. **Climbing Gyms**
   - RoKC North Kansas City
   - RoKC Olathe
   - Sequence Climb
   - Rendezvous Climbing Gym

3. **University Programs**
   - UMKC Bloch School of Management
   - UMKC School of Nursing
   - Rockhurst University

4. **Coworking Spaces**
   - WeWork Corrigan Station
   - Spark Coworking (Two Light)
   - Hive Coworking
   - Industrious Country Club Plaza

## 🔍 GCA Scoring System

The system implements a 4-filter compatibility assessment:

1. **Lifestyle Filter** (Threshold: ≥1.5)
2. **Learning Filter** (Threshold: ≥1.3)
3. **Future Filter** (Threshold: ≥1.3)
4. **Relationship Filter** (Threshold: ≥1.7)

Each location receives a GCA compatibility score from 1.0-5.0.

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check your connection string
   - Ensure IP whitelist includes 0.0.0.0/0 for cloud deployment
   - Verify username/password

2. **Python Dependencies Missing**
   - Run `pip install -r requirements.txt`
   - For deployment, ensure build script installs Python deps

3. **CORS Issues**
   - Backend includes CORS middleware
   - Ensure frontend uses correct backend URL

4. **API Endpoints Not Working**
   - Check server logs
   - Verify environment variables are set
   - Test with curl: `curl https://your-backend.railway.app/api/data`

### Debug Mode

Enable debug logging by setting:
```bash
export DEBUG=true
```

## 📈 Monitoring

### Health Check
- `GET /api/data` should return 200 with data
- Check MongoDB Atlas metrics
- Monitor deployment platform logs

### Performance
- API responses typically < 500ms
- Scraping takes 5-10 seconds
- Database queries optimized for small datasets

## 🔐 Security

- No authentication required (read-only data)
- CORS enabled for GitHub Pages
- Environment variables for sensitive data
- Rate limiting recommended for production

## 📝 License

This project is part of a personal portfolio and research framework.

## 🤝 Contributing

This is a personal project, but suggestions and improvements are welcome via issues.

---

**Need Help?** Check the troubleshooting section or create an issue with:
- Error messages
- Browser console logs
- Deployment platform logs
- Steps to reproduce
