'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { QueryResult, isNoSQLQuery } from '@/app/home/data/query'

const RecursiveDisplay = ({ data }: { data: any }) => {
  if (typeof data !== 'object' || data === null) {
    return <span>{JSON.stringify(data)}</span>;
  }

  return (
    <ul className="list-disc pl-4">
      {Object.entries(data).map(([key, value]) => (
        <li key={key} className="mb-1">
          <span className="font-semibold">{key}:</span>{' '}
          {Array.isArray(value) ? (
            <span>[{value.map((item, index) => <RecursiveDisplay key={index} data={item} />)}</span>
          ) : (
            <RecursiveDisplay data={value} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default function NoSQLQueryEditor() {
    const [query, setQuery] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState();
    const [data, setData] = useState<QueryResult>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">NoSQL Query Editor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your NoSQL query here..."
          className="font-mono"
          rows={5}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Executing...' : 'Execute Query'}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {data && isNoSQLQuery(data) && (
        <div className="bg-secondary p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Query Results:</h2>
          {data.results.map((item, index) => (
            <div key={index} className="mb-4 p-2 bg-background rounded-md">
              <RecursiveDisplay data={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}