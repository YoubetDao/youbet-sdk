import { useState } from "react"

export function Button({ onClick, children }: { onClick: () => Promise<void>, children: string }) {
  const [loading, setLoading] = useState(false)
  const doClick = async () => {
    setLoading(true)
    await onClick()
    setLoading(false)
  }
  return <button onClick={doClick} disabled={loading}>{children}</button>
}
