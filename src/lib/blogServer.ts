import "server-only";

export async function getAllBlogSlugs(locale: string) {
    // exemplu: fetch din API / CMS
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog?locale=${locale}`,
        { cache: "no-store" }
    );

    const posts = await res.json();

    return posts.map((post: any) => ({
        slug: post.slug,
        updatedAt: new Date(post.updatedAt),
    }));
}
