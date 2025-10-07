export function extractYoutubeId(url: string): string | null {
    try {
        const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
        if (embedMatch) return embedMatch[1];

        const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
        if (watchMatch) return watchMatch[1];

        const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
        if (shortMatch) return shortMatch[1];

        const genericMatch = url.match(/([a-zA-Z0-9_-]{11})/);
        if (genericMatch) return genericMatch[1];

        return null;
    } catch {
        return null;
    }
}