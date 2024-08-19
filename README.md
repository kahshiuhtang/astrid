# AstridFS

AstridFS is a distributed enterprise file system that supports strong search capabilities, knowledge base generation, and diverse data ingestion

In summary, it is an engine for searching through documentation, related files, messages and tickets

## Key Objectives:

Enhance File Management: Implement a scalable, secure, and fault-tolerant distributed file system that simplifies file storage, retrieval, and collaboration across the enterprise.

Improve Information Discovery: Develop a powerful custom search engine that enables users to quickly find relevant information through advanced search capabilities and personalized results.

Automate Knowledge Extraction: Create an intelligent knowledge base system that automatically aggregates, categorizes, and connects information from various files and documents.

Ensure Data Security: Implement robust security measures, including granular access controls, encryption, and comprehensive audit trails to protect sensitive information.

Boost Productivity: Provide intuitive user interfaces and integrations that streamline workflows and reduce time spent on file management and information retrieval tasks.

Enable Data-Driven Insights: Offer analytics and reporting tools that provide valuable insights into file usage, search patterns, and knowledge trends within the organization.

## Dependencies

1. make
2. Go 1.20+
3. goyacc

## To Run

```bash
sudo apt install golang-golang-x-tools
make all
```

#### Smaller ideas

-   Link articles and have those articles be searchable

-   Track the history of search queries

## Problems

1. How to prevent different people from relearning the same things again?

2. How to search when you don't know the words?

3. How to understand user behavior?

4. How to structure data that has no structure?

5. How to generate metadata?

## Useful Documentation

1. (https://datawarrior.medium.com/building-a-search-engine-lucene-tutorial-a515e3bfb44b)

2. (https://j.blaszyk.me/tech-blog/exploring-apache-lucene-index/)

3. (https://en.wikipedia.org/wiki/PageRank)

4. (https://stackoverflow.com/questions/2602253/how-does-lucene-index-documents)

5. (https://info.seibert.group/display/Atlassian/Overview+of+all+180+Confluence+features)
