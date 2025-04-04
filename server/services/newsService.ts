
import axios from 'axios';
import Parser from 'rss-parser';
import schedule from 'node-schedule';

interface SecurityNews {
  id: string;
  title: string;
  description: string;
  date: string;
  source: string;
  link: string;
  category: string;
  severity?: string;
}

let securityNews: SecurityNews[] = [];
const parser = new Parser();

const RSS_FEEDS = [
  {
    url: 'https://feeds.feedburner.com/TheHackersNews',
    source: 'The Hacker News'
  },
  {
    url: 'https://www.bleepingcomputer.com/feed/',
    source: 'Bleeping Computer'
  },
  {
    url: 'https://www.darkreading.com/rss.xml',
    source: 'Dark Reading'
  }
];

async function fetchNVDVulnerabilities() {
  try {
    const response = await axios.get(
      'https://services.nvd.nist.gov/rest/json/cves/2.0',
      {
        params: {
          resultsPerPage: 20,
          pubStartDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        }
      }
    );

    return response.data.vulnerabilities.map((vuln: any) => ({
      id: vuln.cve.id,
      title: `New Vulnerability: ${vuln.cve.id}`,
      description: vuln.cve.descriptions[0]?.value || 'No description available',
      date: vuln.cve.published,
      source: 'NVD',
      link: `https://nvd.nist.gov/vuln/detail/${vuln.cve.id}`,
      category: 'Vulnerability',
      severity: vuln.cve.metrics?.cvssMetricV31?.[0]?.cvssData?.baseSeverity || 'Unknown'
    }));
  } catch (error) {
    console.error('Error fetching NVD data:', error);
    return [];
  }
}

async function fetchRSSFeeds() {
  try {
    const newsItems = await Promise.all(
      RSS_FEEDS.map(async (feed) => {
        const feedData = await parser.parseURL(feed.url);
        return feedData.items.slice(0, 10).map((item) => ({
          id: item.guid || item.link,
          title: item.title,
          description: item.contentSnippet || item.content,
          date: item.pubDate,
          source: feed.source,
          link: item.link,
          category: 'Security News'
        }));
      })
    );
    return newsItems.flat();
  } catch (error) {
    console.error('Error fetching RSS feeds:', error);
    return [];
  }
}

async function updateNews() {
  const [vulnerabilities, newsItems] = await Promise.all([
    fetchNVDVulnerabilities(),
    fetchRSSFeeds()
  ]);
  
  securityNews = [...vulnerabilities, ...newsItems]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Schedule daily updates
schedule.scheduleJob('0 0 * * *', updateNews);

// Initial fetch
updateNews();

export const getSecurityNews = () => securityNews;
