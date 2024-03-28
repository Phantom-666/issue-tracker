"use client"
import { TextField, TextArea, Button } from "@radix-ui/themes"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

const NewIssue = () => {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const submitForm = async () => {
    const obj = { title, description }

    await axios.post("/api/issues", obj)

    router.push("/issues")
  }

  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root
        placeholder="Search the docs…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></TextField.Root>
      <TextArea
        placeholder="Reply to comment…"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button onClick={submitForm}>Submit new issue</Button>
    </div>
  )
}

export default NewIssue
