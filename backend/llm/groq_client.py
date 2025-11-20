"""
Groq API Client
Free, fast LLM inference using Mixtral-8x7b
"""

import os
from typing import List, Dict, Optional
import requests
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class GroqClient:
    """
    Client for Groq API

    Groq provides free, ultra-fast LLM inference with models like Mixtral-8x7b
    Speed: ~10x faster than OpenAI
    Cost: FREE with generous limits
    """

    def __init__(self, api_key: Optional[str] = None):
        """
        Initialize Groq client

        Args:
            api_key: Groq API key (get free at console.groq.com)
        """
        self.api_key = api_key or os.getenv("GROQ_API_KEY")

        if not self.api_key:
            raise ValueError(
                "GROQ_API_KEY not found. Get your free key at https://console.groq.com"
            )

        self.base_url = "https://api.groq.com/openai/v1"
        self.default_model = "mixtral-8x7b-32768"  # 32k context window

        # Alternative models available:
        # - llama2-70b-4096 (more accurate, smaller context)
        # - gemma-7b-it (Google's Gemma)

    def chat_completion(
        self,
        messages: List[Dict[str, str]],
        model: Optional[str] = None,
        temperature: float = 0.3,
        max_tokens: int = 2048
    ) -> str:
        """
        Generate chat completion

        Args:
            messages: List of message dicts with 'role' and 'content'
            model: Model to use (default: mixtral-8x7b-32768)
            temperature: Randomness (0-1, lower = more deterministic)
            max_tokens: Maximum response length

        Returns:
            Generated text response
        """
        model = model or self.default_model

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

        data = {
            "model": model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens
        }

        try:
            response = requests.post(
                f"{self.base_url}/chat/completions",
                headers=headers,
                json=data,
                timeout=30
            )
            response.raise_for_status()

            result = response.json()
            return result['choices'][0]['message']['content']

        except requests.exceptions.RequestException as e:
            logger.error(f"Groq API error: {e}")
            raise

    def stream_completion(
        self,
        messages: List[Dict[str, str]],
        model: Optional[str] = None,
        temperature: float = 0.3
    ):
        """
        Stream chat completion (for real-time responses)

        Args:
            messages: List of message dicts
            model: Model to use
            temperature: Randomness

        Yields:
            Text chunks as they are generated
        """
        model = model or self.default_model

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

        data = {
            "model": model,
            "messages": messages,
            "temperature": temperature,
            "stream": True
        }

        try:
            response = requests.post(
                f"{self.base_url}/chat/completions",
                headers=headers,
                json=data,
                stream=True,
                timeout=30
            )
            response.raise_for_status()

            for line in response.iter_lines():
                if line:
                    line = line.decode('utf-8')
                    if line.startswith('data: '):
                        data_str = line[6:]  # Remove 'data: ' prefix
                        if data_str == '[DONE]':
                            break

                        try:
                            import json
                            data = json.loads(data_str)
                            delta = data['choices'][0]['delta']
                            if 'content' in delta:
                                yield delta['content']
                        except:
                            continue

        except requests.exceptions.RequestException as e:
            logger.error(f"Groq streaming error: {e}")
            raise


def test_groq():
    """Test Groq client"""
    client = GroqClient()

    messages = [
        {"role": "system", "content": "You are a helpful assistant for Casper Network."},
        {"role": "user", "content": "What is Casper Network in one sentence?"}
    ]

    logger.info("Testing Groq API...")
    response = client.chat_completion(messages)
    logger.info(f"Response: {response}")

    logger.info("\nTesting streaming...")
    print("Streaming response: ", end="", flush=True)
    for chunk in client.stream_completion(messages):
        print(chunk, end="", flush=True)
    print("\n")


if __name__ == "__main__":
    test_groq()
