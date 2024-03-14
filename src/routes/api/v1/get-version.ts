export interface Version {
  number: number,
  tag: string
}

export async function GET() {
  return Response.json(
    {
      number: 1,
      tag: "1.0.0"
    } as Version
  )
}