import axios from 'axios';
import cheerio from 'cheerio';

/**
 * Function to extract all content from a given URL
 * @param {string} url - The URL of the page to extract content from
 * @returns {object} - Returns all textual content including title, meta description, headings, paragraphs, and links
 */
export async function extractAllContent(url) {
    try {
        // Fetch the HTML of the page
        const { data: html } = await axios.get(url);

        // Load the HTML into cheerio for parsing
        const $ = cheerio.load(html);

        // Extract title and meta description
        const title = $('title').text() || 'No title found';
        const metaDescription = $('meta[name="description"]').attr('content') || 'No description found';

        // Extract headings
        const headings = [];
        $('h1, h2, h3').each((i, elem) => {
            headings.push($(elem).text());
        });

        // Extract all paragraphs
        const paragraphs = [];
        $('p').each((i, elem) => {
            paragraphs.push($(elem).text().trim());
        });

        // Optionally extract links and other data
        const links = [];
        $('a').each((i, elem) => {
            links.push($(elem).attr('href'));
        });

        // Combine all extracted content into a single object
        const allContent = {
            title,
            metaDescription,
            headings,
            paragraphs,
            links
        };

        return allContent;
    } catch (error) {
        console.error('Error extracting content:', error);
        throw error;
    }
}