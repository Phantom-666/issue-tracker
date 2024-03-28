"use client"

import { Button, Table } from "@radix-ui/themes"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"

interface IData {
  id: number
  title: string
  description: string
  status: string
}

const Issues = () => {
  const [issues, setIssues] = useState<IData[]>([])

  const fetchIssues = async () => {
    const i: {
      data: IData[]
    } = await axios.get("/api/issues")

    setIssues(i.data)
  }

  fetchIssues()

  return (
    <div>
      <Table.Root className="mb-3">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((i) => (
            <Table.Row key={i.id}>
              <Table.RowHeaderCell>{i.title}</Table.RowHeaderCell>
              <Table.Cell>{i.description}</Table.Cell>
              <Table.Cell>{i.status}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Button>
        <Link href={"/issues/new"}>New issue</Link>
      </Button>
    </div>
  )
}

export default Issues
