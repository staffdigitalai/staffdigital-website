export default async function DynamicServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { slug } = await params

  return (
    <div style={{ padding: "100px", color: "white", background: "black" }}>
      <h1>DEBUG: slug = {slug}</h1>
      <p>This is a minimal test page.</p>
    </div>
  )
}
