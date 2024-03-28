"use client"
import { TextField, TextArea, Button, Callout } from "@radix-ui/themes"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import Spinner from "@/components/spinner"

const NewIssue = () => {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const submitForm = async () => {
    const obj = { title, description }

    try {
      setIsSubmitted(true)
      await axios.post("/api/issues", obj)
      router.push("/issues")
    } catch (error) {
      console.log(error)
      setError("An unexpected error")
      setIsSubmitted(false)
    }
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

      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <Button disabled={isSubmitted} onClick={submitForm}>
        Submit new issue {isSubmitted && <Spinner />}
      </Button>
    </div>
  )
}

export default NewIssue
