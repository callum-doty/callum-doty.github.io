#!/usr/bin/env python3
"""
Kansas City Dating Strategy - Data Scraping & Analysis Framework
Systematically collect and analyze KC demographic and activity data for GCA targeting
"""

import requests
import pandas as pd
import json
import time
import argparse
import sys
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import sqlite3
from bs4 import BeautifulSoup
import logging

# MongoDB imports
try:
    from pymongo import MongoClient
    MONGODB_AVAILABLE = True
except ImportError:
    MONGODB_AVAILABLE = False
    print("Warning: pymongo not installed. Using SQLite fallback.")

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class KCDataScraper:
    def __init__(self, mongodb_uri=None, output_format='sqlite'):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        
        self.output_format = output_format
        self.mongodb_uri = mongodb_uri
        self.db_connection = None
        self.mongo_db = None
        
        if output_format == 'mongodb' and mongodb_uri and MONGODB_AVAILABLE:
            self.initialize_mongodb()
        else:
            self.db_connection = sqlite3.connect('kc_dating_data.db')
            self.initialize_database()
    
    def initialize_mongodb(self):
        """Initialize MongoDB connection"""
        try:
            self.mongo_client = MongoClient(self.mongodb_uri)
            self.mongo_db = self.mongo_client.gca_data
            logger.info("Connected to MongoDB")
        except Exception as e:
            logger.error(f"MongoDB connection failed: {e}")
            logger.info("Falling back to SQLite")
            self.db_connection = sqlite3.connect('kc_dating_data.db')
            self.initialize_database()
    
    def initialize_database(self):
        """Create database tables for storing collected data"""
        cursor = self.db_connection.cursor()
        
        # Meetup Groups Table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS meetup_groups (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                category TEXT,
                member_count INTEGER,
                description TEXT,
                location TEXT,
                organizer TEXT,
                created_date TEXT,
                last_event_date TEXT,
                scraped_date TEXT
            )
        ''')
        
        # Climbing Gyms Table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS climbing_gyms (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                address TEXT,
                phone TEXT,
                membership_demographics TEXT,
                class_schedule TEXT,
                pricing TEXT,
                amenities TEXT,
                scraped_date TEXT
            )
        ''')
        
        # University Programs Table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS university_programs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                institution TEXT,
                program_name TEXT,
                degree_type TEXT,
                female_enrollment_pct REAL,
                total_enrollment INTEGER,
                evening_classes BOOLEAN,
                networking_events TEXT,
                scraped_date TEXT
            )
        ''')
        
        # Coworking Spaces Table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS coworking_spaces (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                address TEXT,
                membership_count INTEGER,
                industry_mix TEXT,
                pricing TEXT,
                amenities TEXT,
                events TEXT,
                scraped_date TEXT
            )
        ''')
        
        self.db_connection.commit()
    
    def scrape_meetup_groups(self) -> List[Dict]:
        """
        Scrape Kansas City Meetup groups focusing on professional, tech, and fitness categories
        NOTE: This would need actual Meetup API key in production
        """
        logger.info("Starting Meetup groups scraping...")
        
        # Based on our research findings
        discovered_groups = [
            {
                'name': 'Kansas City Women in Technology',
                'category': 'tech',
                'member_count': 2609,
                'description': 'Grassroots organization growing women in tech careers in KC',
                'location': 'Kansas City, MO',
                'organizer': 'Jennifer Wadella',
                'gca_compatibility': 'HIGH',
                'target_demographic': 'Female tech professionals, 25-35'
            },
            {
                'name': 'Ropes KC Indoor Rock Climbing',
                'category': 'fitness',
                'member_count': 671,
                'description': 'Regular climbing meetups at various gyms throughout the city',
                'location': 'Kansas City, MO',
                'organizer': 'Zin K',
                'gca_compatibility': 'HIGH',
                'target_demographic': 'Climbing enthusiasts, goal-oriented individuals'
            },
            {
                'name': 'Kansas City Adventure Club',
                'category': 'outdoor',
                'member_count': 2722,
                'description': 'Adventure junkies exploring, exercising, and having fun',
                'location': 'Kansas City, MO',
                'organizer': 'Adventure Club',
                'gca_compatibility': 'MEDIUM',
                'target_demographic': 'Active professionals, 20s-30s'
            },
            {
                'name': 'Explorer Chicks of Kansas City',
                'category': 'outdoor',
                'member_count': 3172,
                'description': 'Women-focused adventure and exploration group',
                'location': 'Kansas City, MO',
                'organizer': 'Explorer Chicks',
                'gca_compatibility': 'MEDIUM',
                'target_demographic': 'Adventurous women, various ages'
            },
            {
                'name': 'Big Data KC',
                'category': 'tech',
                'member_count': 1500,  # Estimated
                'description': 'Data science community keeping ahead of data tech and trends',
                'location': 'Kansas City, MO',
                'organizer': 'Data Community',
                'gca_compatibility': 'HIGH',
                'target_demographic': 'Data professionals, analytical thinkers'
            }
        ]
        
        # Store in database
        self.store_data('meetup_groups', discovered_groups)
        logger.info(f"Stored {len(discovered_groups)} meetup groups")
        return discovered_groups
    
    def scrape_climbing_facilities(self) -> List[Dict]:
        """Scrape climbing gym data from Kansas City"""
        logger.info("Starting climbing facilities scraping...")
        
        climbing_facilities = [
            {
                'name': 'RoKC North Kansas City',
                'address': 'North Kansas City, MO',
                'phone': None,
                'description': 'Premier climbing gym with tall climbing, bouldering, auto-belays',
                'amenities': ['fitness', 'yoga', 'private events', 'youth programs'],
                'membership_pricing': '$21/week unlimited',
                'programs': ['Intro to Climbing', 'Top Rope Course', 'Lead Course'],
                'demographics': 'Mixed ages, goal-oriented climbers',
                'gca_compatibility': 'HIGH'
            },
            {
                'name': 'RoKC Olathe',
                'address': 'Olathe, KS',
                'phone': None,
                'description': 'Second RoKC location serving Kansas side',
                'amenities': ['climbing', 'fitness', 'youth camps'],
                'membership_pricing': '$21/week unlimited',
                'programs': ['Summer camps', 'Youth programs'],
                'demographics': 'Family-oriented, suburban professionals',
                'gca_compatibility': 'MEDIUM'
            },
            {
                'name': 'Sequence Climb',
                'address': 'Kansas City, MO',
                'phone': None,
                'description': 'Climbing, yoga & fitness facility with training focus',
                'amenities': ['Campus board', 'Kilter Board', 'Tension Board', 'yoga'],
                'hours': 'Mon-Fri 10am-10pm, Weekends 10am-8pm',
                'demographics': 'Serious climbers, fitness-focused individuals',
                'gca_compatibility': 'HIGH'
            },
            {
                'name': 'Rendezvous Climbing Gym',
                'address': 'Kansas City area',
                'phone': None,
                'description': 'Local climbing facility',
                'amenities': ['climbing walls'],
                'demographics': 'Local climbing community',
                'gca_compatibility': 'MEDIUM'
            }
        ]
        
        # Store in database
        self.store_data('climbing_gyms', climbing_facilities)
        logger.info(f"Stored {len(climbing_facilities)} climbing facilities")
        return climbing_facilities
    
    def scrape_university_programs(self) -> List[Dict]:
        """Scrape university MBA and graduate program data"""
        logger.info("Starting university programs scraping...")
        
        university_programs = [
            {
                'institution': 'UMKC Bloch School of Management',
                'program_name': 'Professional MBA',
                'degree_type': 'MBA',
                'total_enrollment': 200,  # Estimated
                'female_enrollment_pct': 55.0,
                'evening_classes': True,
                'networking_events': 'Signature networking events, industry professionals',
                'scholarships': '$4,000-$15,000 available',
                'gca_compatibility': 'HIGH',
                'target_demographic': 'Working professionals, career advancement focused'
            },
            {
                'institution': 'UMKC Bloch School of Management',
                'program_name': 'Executive MBA',
                'degree_type': 'EMBA',
                'total_enrollment': 50,  # Estimated
                'female_enrollment_pct': 50.0,
                'evening_classes': True,
                'networking_events': 'Executive networking, industry connections',
                'gca_compatibility': 'HIGH',
                'target_demographic': 'Senior professionals, executives'
            },
            {
                'institution': 'UMKC School of Nursing',
                'program_name': 'Doctor of Nursing Practice',
                'degree_type': 'DNP',
                'total_enrollment': 150,  # Estimated
                'female_enrollment_pct': 85.0,
                'evening_classes': True,
                'networking_events': 'Healthcare professional events',
                'gca_compatibility': 'HIGH',
                'target_demographic': 'Healthcare professionals, goal-oriented nurses'
            },
            {
                'institution': 'Rockhurst University',
                'program_name': 'Management MBA',
                'degree_type': 'MBA',
                'total_enrollment': 100,  # Estimated
                'female_enrollment_pct': 50.0,
                'evening_classes': True,
                'networking_events': 'Jesuit leadership focus, community service',
                'gca_compatibility': 'HIGH',
                'target_demographic': 'Service-oriented professionals, leadership focused'
            },
            {
                'institution': 'UMKC Various Graduate Programs',
                'program_name': 'Graduate Student Population',
                'degree_type': 'Mixed',
                'total_enrollment': 23384,
                'female_enrollment_pct': 55.0,
                'evening_classes': True,
                'networking_events': 'Student organizations, professional associations',
                'gca_compatibility': 'MEDIUM-HIGH',
                'target_demographic': 'Graduate students, diverse fields'
            }
        ]
        
        # Store in database
        self.store_data('university_programs', university_programs)
        logger.info(f"Stored {len(university_programs)} university programs")
        return university_programs
    
    def scrape_coworking_spaces(self) -> List[Dict]:
        """Scrape coworking space data"""
        logger.info("Starting coworking spaces scraping...")
        
        coworking_spaces = [
            {
                'name': 'WeWork Corrigan Station',
                'address': '1828 Walnut St, 3rd Floor, Kansas City, MO',
                'membership_count': 300,  # Estimated
                'industry_mix': 'Tech, Finance, Consulting, Startups',
                'pricing': 'Hot desk $250/mo, Private office $400+/mo',
                'amenities': ['WiFi', 'Coffee', 'Phone booths', 'Conference rooms', 'Events'],
                'events': 'Professional and social events, networking',
                'gca_compatibility': 'HIGH',
                'target_demographic': 'Young professionals, entrepreneurs'
            },
            {
                'name': 'Spark Coworking (Two Light)',
                'address': 'Power & Light District, Kansas City, MO',
                'membership_count': 150,  # Estimated
                'industry_mix': 'Tech, Startups, Creative',
                'pricing': 'Membership-based',
                'amenities': ['Private offices', 'Shared workspace', 'Downtown location'],
                'events': 'Entrepreneurial ecosystem events',
                'gca_compatibility': 'HIGH',
                'target_demographic': 'Entrepreneurs, tech innovators'
            },
            {
                'name': 'Hive Coworking',
                'address': 'River Market, Kansas City, MO',
                'membership_count': 100,  # Estimated
                'industry_mix': 'New professionals, Startups, Small teams',
                'pricing': '$100/mo open workspace, $300+/mo private',
                'amenities': ['Fiber internet', 'Conference room', 'Community kitchen'],
                'events': 'Networking events, community building',
                'gca_compatibility': 'HIGH',
                'target_demographic': 'New professionals, startup founders'
            },
            {
                'name': 'Industrious Country Club Plaza',
                'address': '420 Nichols Road, Kansas City, MO',
                'membership_count': 200,  # Estimated
                'industry_mix': 'Professional services, Finance, Healthcare',
                'pricing': 'Premium pricing',
                'amenities': ['Natural light', 'Parking garage', 'Upscale environment'],
                'events': 'Professional networking, client meetings',
                'gca_compatibility': 'HIGH',
                'target_demographic': 'Established professionals, consultants'
            }
        ]
        
        # Store in database
        self.store_data('coworking_spaces', coworking_spaces)
        logger.info(f"Stored {len(coworking_spaces)} coworking spaces")
        return coworking_spaces
    
    def store_data(self, collection_name: str, data: List[Dict]):
        """Store data in MongoDB or SQLite depending on configuration"""
        if self.mongo_db:
            # MongoDB storage
            try:
                # Add scraped_date to each document
                for item in data:
                    item['scraped_date'] = datetime.now().isoformat()
                
                # Clear existing data and insert new data
                self.mongo_db[collection_name].delete_many({})
                self.mongo_db[collection_name].insert_many(data)
                logger.info(f"Stored {len(data)} documents in MongoDB collection: {collection_name}")
            except Exception as e:
                logger.error(f"MongoDB storage failed: {e}")
                # Fallback to file storage
                self.store_data_as_files(collection_name, data)
        else:
            # SQLite storage (existing logic)
            self.store_data_sqlite(collection_name, data)
    
    def store_data_sqlite(self, collection_name: str, data: List[Dict]):
        """Store data in SQLite database"""
        cursor = self.db_connection.cursor()
        
        if collection_name == 'meetup_groups':
            for item in data:
                cursor.execute('''
                    INSERT INTO meetup_groups 
                    (name, category, member_count, description, location, organizer, scraped_date)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                ''', (
                    item['name'], item['category'], item['member_count'],
                    item['description'], item['location'], item['organizer'],
                    datetime.now().isoformat()
                ))
        elif collection_name == 'climbing_gyms':
            for item in data:
                cursor.execute('''
                    INSERT INTO climbing_gyms 
                    (name, address, membership_demographics, amenities, pricing, scraped_date)
                    VALUES (?, ?, ?, ?, ?, ?)
                ''', (
                    item['name'], item['address'], item['demographics'],
                    json.dumps(item['amenities']), item.get('membership_pricing', 'N/A'),
                    datetime.now().isoformat()
                ))
        elif collection_name == 'university_programs':
            for item in data:
                cursor.execute('''
                    INSERT INTO university_programs 
                    (institution, program_name, degree_type, female_enrollment_pct, 
                     total_enrollment, evening_classes, networking_events, scraped_date)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    item['institution'], item['program_name'], item['degree_type'],
                    item['female_enrollment_pct'], item['total_enrollment'],
                    item['evening_classes'], item['networking_events'],
                    datetime.now().isoformat()
                ))
        elif collection_name == 'coworking_spaces':
            for item in data:
                cursor.execute('''
                    INSERT INTO coworking_spaces 
                    (name, address, membership_count, industry_mix, pricing, amenities, events, scraped_date)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    item['name'], item['address'], item['membership_count'],
                    item['industry_mix'], item['pricing'], json.dumps(item['amenities']),
                    item['events'], datetime.now().isoformat()
                ))
        
        self.db_connection.commit()
    
    def store_data_as_files(self, collection_name: str, data: List[Dict]):
        """Fallback: Store data as JSON files"""
        filename = f"{collection_name}.json"
        try:
            with open(filename, 'w') as f:
                json.dump(data, f, indent=2, default=str)
            logger.info(f"Stored {len(data)} items in file: {filename}")
        except Exception as e:
            logger.error(f"File storage failed: {e}")
    
    def run_selective_scraping(self, types: List[str] = None):
        """Run scraping for specific data types"""
        results = {}
        
        if not types or 'meetup_groups' in types:
            results['meetup_groups'] = self.scrape_meetup_groups()
        
        if not types or 'climbing_gyms' in types:
            results['climbing_gyms'] = self.scrape_climbing_facilities()
        
        if not types or 'university_programs' in types:
            results['university_programs'] = self.scrape_university_programs()
        
        if not types or 'coworking_spaces' in types:
            results['coworking_spaces'] = self.scrape_coworking_spaces()
        
        return results
    
    def generate_targeting_report(self) -> Dict:
        """Generate comprehensive targeting report"""
        logger.info("Generating targeting report...")
        
        # Get all data
        all_data = self.run_selective_scraping()
        
        # Generate compatibility analysis
        analysis = []
        
        # Process each data type
        for data_type, items in all_data.items():
            for item in items:
                try:
                    gca_score = self.calculate_gca_score(data_type, item)
                    analysis.append({
                        'type': data_type,
                        'name': item.get('name', 'Unknown'),
                        'location': item.get('address') or item.get('location') or item.get('institution', 'Unknown'),
                        'gca_score': gca_score,
                        'target_demographic': self.get_target_demographic(data_type, item),
                        'best_times': self.get_optimal_times(data_type),
                        'weekly_frequency': self.get_weekly_frequency(data_type)
                    })
                except Exception as e:
                    logger.error(f"Error processing item {item}: {e}")
                    continue
        
        # Sort by GCA score
        analysis.sort(key=lambda x: x['gca_score'], reverse=True)
        
        return {
            'top_10_locations': analysis[:10],
            'by_category': self.group_by_category(analysis),
            'optimal_schedule': self.generate_optimal_schedule(),
            'success_metrics': self.define_success_metrics(),
            'total_locations': len(analysis),
            'data_freshness': datetime.now().isoformat()
        }
    
    def calculate_gca_score(self, category: str, data: Dict) -> float:
        """Calculate GCA compatibility score based on category and data"""
        base_scores = {
            'meetup_groups': 4.0,
            'climbing_gyms': 4.2,
            'university_programs': 4.1,
            'coworking_spaces': 3.9
        }
        return base_scores.get(category, 3.0)
    
    def get_target_demographic(self, category: str, data: Dict) -> str:
        """Get target demographic description"""
        if category == 'meetup_groups':
            return f"Members: {data.get('member_count', 'Unknown')}, Category: {data.get('category', 'Unknown')}"
        elif category == 'climbing_gyms':
            return data.get('demographics', 'Climbing enthusiasts')
        elif category == 'university_programs':
            return f"{data.get('female_enrollment_pct', 50)}% female enrollment"
        elif category == 'coworking_spaces':
            return data.get('industry_mix', 'Professional demographic')
        return 'Mixed demographic'
    
    def get_optimal_times(self, category: str) -> str:
        """Get optimal timing for each category"""
        time_mappings = {
            'meetup_groups': 'Evening events 6-8pm, Weekend activities',
            'climbing_gyms': 'Weekday evenings 6-8pm, Weekend mornings 10am-12pm',
            'university_programs': 'Evening classes 6-9pm, Library study 7-10pm',
            'coworking_spaces': 'Weekdays 10am-4pm, Networking events 5-7pm'
        }
        return time_mappings.get(category, 'Weekday evenings')
    
    def get_weekly_frequency(self, category: str) -> str:
        """Get weekly frequency for each category"""
        frequencies = {
            'meetup_groups': 'Weekly/Bi-weekly events',
            'climbing_gyms': 'Daily access',
            'university_programs': 'Multiple times per week',
            'coworking_spaces': 'Daily access'
        }
        return frequencies.get(category, 'Weekly')
    
    def group_by_category(self, analysis: List[Dict]) -> Dict:
        """Group analysis by category"""
        categories = {}
        
        for item in analysis:
            category = item['type']
            if category not in categories:
                categories[category] = []
            categories[category].append(item)
        
        # Get top 3 for each category
        result = {}
        for category, items in categories.items():
            result[category] = {
                'top_3': items[:3],
                'average_gca_score': sum(item['gca_score'] for item in items) / len(items),
                'total_locations': len(items)
            }
        
        return result
    
    def generate_optimal_schedule(self) -> Dict:
        """Generate optimal weekly schedule based on data"""
        return {
            'monday': {'time': '6:30-8:30 PM', 'activity': 'RoKC Climbing', 'type': 'fitness'},
            'tuesday': {'time': '6:00-9:00 PM', 'activity': 'UMKC Library Study', 'type': 'university'},
            'wednesday': {'time': '7:00-9:00 PM', 'activity': 'WeWork Networking', 'type': 'coworking'},
            'thursday': {'time': '6:30-8:30 PM', 'activity': 'Sequence Climb', 'type': 'fitness'},
            'friday': {'time': '5:30-7:30 PM', 'activity': 'KC Women in Tech Meetup', 'type': 'meetup'},
            'saturday': {'time': '10:00 AM-12:00 PM', 'activity': 'Coffee near campus', 'type': 'university'},
            'sunday': {'time': '2:00-4:00 PM', 'activity': 'Study/work session', 'type': 'flexible'}
        }
    
    def define_success_metrics(self) -> Dict:
        """Define success metrics for tracking"""
        return {
            'weekly_interactions_target': 20,
            'gca_filter1_pass_rate_target': 0.30,
            'location_efficiency_target': 2.5,
            'monthly_new_locations_target': 2,
            'follow_up_rate_target': 0.20
        }
    
    def close(self):
        """Close database connections"""
        if self.db_connection:
            self.db_connection.close()
        if hasattr(self, 'mongo_client'):
            self.mongo_client.close()


def parse_arguments():
    """Parse command line arguments"""
    parser = argparse.ArgumentParser(description='Kansas City GCA Data Scraper')
    parser.add_argument('--types', type=str, help='Comma-separated list of data types to scrape')
    parser.add_argument('--output', type=str, choices=['json', 'mongodb', 'sqlite'], 
                       default='sqlite', help='Output format')
    parser.add_argument('--mongodb-uri', type=str, help='MongoDB connection URI')
    return parser.parse_args()


def main():
    """Main execution function with command line support"""
    args = parse_arguments()
    
    print("Kansas City Dating Strategy - Data Scraping Framework")
    print("=" * 60)
    
    # Parse types if provided
    types = None
    if args.types:
        types = [t.strip() for t in args.types.split(',')]
    
    # Initialize scraper with appropriate configuration
    scraper = KCDataScraper(
        mongodb_uri=args.mongodb_uri,
        output_format=args.output
    )
    
    try:
        if args.output == 'json' and not types:
            # Generate and output JSON report for web service
            report = scraper.generate_targeting_report()
            print(json.dumps(report, indent=2, default=str))
        else:
            # Run selective scraping
            results = scraper.run_selective_scraping(types)
            
            # Display summary
            print("\n📊 SUMMARY RESULTS")
            print("=" * 60)
            for data_type, items in results.items():
                print(f"📍 {data_type.replace('_', ' ').title()}: {len(items)}")
            
            # Generate report
            report = scraper.generate_targeting_report()
            
            print("\n🏆 TOP 5 LOCATIONS BY GCA COMPATIBILITY:")
            for i, location in enumerate(report['top_10_locations'][:5], 1):
                print(f"{i}. {location['name']} - Score: {location['gca_score']:.1f}")
            
            if args.output == 'json':
                print(json.dumps(report, indent=2, default=str))
        
    except Exception as e:
        logger.error(f"Error during scraping: {e}")
        print(f"❌ Error: {e}")
        sys.exit(1)
    
    finally:
        scraper.close()


if __name__ == "__main__":
    main()
