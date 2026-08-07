export default {
  async fetch(request: Request): Promise<Response> {
    const host = new URL(request.url).hostname
    return Response.json({
      ok: true,
      service: 'ejdcard-worker',
      host,
    })
  },
} satisfies ExportedHandler
