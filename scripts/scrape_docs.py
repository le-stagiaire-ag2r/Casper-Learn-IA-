#!/usr/bin/env python3
"""
Scraper pour la documentation CSPR.cloud
Extrait tout le contenu de la documentation pour indexation
"""

import os
import json
import time
import requests
from bs4 import BeautifulSoup
from typing import List, Dict
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class CsprCloudScraper:
    """Scraper pour docs.cspr.cloud"""

    def __init__(self, base_url: str = "https://docs.cspr.cloud"):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        self.docs = []

    def fetch_page(self, url: str) -> str:
        """Récupère le contenu HTML d'une page"""
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            return response.text
        except Exception as e:
            logger.error(f"Erreur lors du fetch de {url}: {e}")
            return None

    def parse_documentation_page(self, html: str, url: str) -> Dict:
        """Parse une page de documentation et extrait le contenu"""
        soup = BeautifulSoup(html, 'html.parser')

        # Extraction du titre
        title = soup.find('h1')
        title_text = title.get_text().strip() if title else "Sans titre"

        # Extraction du contenu principal
        # Adapter selon la structure réelle du site
        main_content = soup.find('main') or soup.find('article') or soup.find('div', class_='content')

        if not main_content:
            main_content = soup.find('body')

        # Extraction du texte brut
        content_text = main_content.get_text(separator='\n', strip=True) if main_content else ""

        # Extraction des exemples de code
        code_blocks = []
        for code in main_content.find_all(['code', 'pre']) if main_content else []:
            code_text = code.get_text().strip()
            if len(code_text) > 10:  # Ignore petits snippets
                code_blocks.append(code_text)

        return {
            'url': url,
            'title': title_text,
            'content': content_text,
            'code_examples': code_blocks,
            'timestamp': time.time()
        }

    def discover_urls(self, start_url: str) -> List[str]:
        """
        Découvre toutes les URLs de documentation
        À adapter selon la structure du site
        """
        urls = set([start_url])
        html = self.fetch_page(start_url)

        if not html:
            return list(urls)

        soup = BeautifulSoup(html, 'html.parser')

        # Trouver tous les liens dans la navigation/menu
        nav_links = soup.find_all('a', href=True)

        for link in nav_links:
            href = link['href']
            # Construire URL complète
            if href.startswith('/'):
                full_url = f"{self.base_url}{href}"
            elif href.startswith('http'):
                if self.base_url in href:
                    full_url = href
                else:
                    continue
            else:
                full_url = f"{self.base_url}/{href}"

            # Filtrer seulement les pages de doc
            if 'docs.cspr.cloud' in full_url:
                urls.add(full_url)

        return list(urls)

    def scrape_all(self) -> List[Dict]:
        """Scrape toute la documentation"""
        logger.info("🚀 Début du scraping CSPR.cloud...")

        # URLs de sections connues
        known_sections = [
            f"{self.base_url}/",
            f"{self.base_url}/getting-started",
            f"{self.base_url}/rest-api",
            f"{self.base_url}/streaming-api",
            f"{self.base_url}/rest-api/accounts",
            f"{self.base_url}/rest-api/blocks",
            f"{self.base_url}/rest-api/contracts",
            f"{self.base_url}/rest-api/tokens",
            f"{self.base_url}/rest-api/delegations",
            f"{self.base_url}/rest-api/validators",
        ]

        all_urls = set(known_sections)

        # Découvrir plus d'URLs depuis chaque section
        for section_url in known_sections:
            discovered = self.discover_urls(section_url)
            all_urls.update(discovered)
            time.sleep(0.5)  # Rate limiting

        logger.info(f"📚 {len(all_urls)} pages découvertes")

        # Scraper chaque page
        for idx, url in enumerate(all_urls, 1):
            logger.info(f"[{idx}/{len(all_urls)}] Scraping {url}")

            html = self.fetch_page(url)
            if html:
                doc = self.parse_documentation_page(html, url)
                if doc['content']:  # Seulement si contenu non-vide
                    self.docs.append(doc)

            time.sleep(0.5)  # Rate limiting

        logger.info(f"✅ Scraping terminé: {len(self.docs)} documents extraits")
        return self.docs

    def save_to_json(self, output_path: str = "data/docs/cspr_cloud_docs.json"):
        """Sauvegarde les documents en JSON"""
        output_file = Path(output_path)
        output_file.parent.mkdir(parents=True, exist_ok=True)

        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(self.docs, f, ensure_ascii=False, indent=2)

        logger.info(f"💾 Documentation sauvegardée dans {output_path}")

        # Statistiques
        total_content = sum(len(doc['content']) for doc in self.docs)
        total_code = sum(len(doc['code_examples']) for doc in self.docs)

        logger.info(f"📊 Stats: {total_content} caractères, {total_code} exemples de code")


def main():
    """Point d'entrée principal"""
    scraper = CsprCloudScraper()
    scraper.scrape_all()
    scraper.save_to_json()


if __name__ == "__main__":
    main()
