import { json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';

import type { MetaFunction } from '@vercel/remix';
import type { LoaderFunctionArgs } from '@remix-run/node';

import { api, Post, Tag } from '~/model/ghost';

import { Layout } from '~/components/Layout';

export const meta: MetaFunction = () => {
  return [
    { title: 'Home - ρV' },
    {
      name: 'description',
      content: 'undefined project - ρV',
    },
  ];
};

export const loader = async (params: LoaderFunctionArgs) => {
  const posts = await api.posts
    .browse({
      limit: 15,
      filter: 'featured:true+visibility:public',
    })
    .fields({
      id: true,
      slug: true,
      title: true,
      feature_image: true,
    })
    .fetch();

  const tags = await api.tags
    .browse({
      limit: 15,
      filter: 'visibility:public',
    })
    .fields({
      id: true,
      name: true,
      slug: true,
    })
    .fetch();

  return json({
    posts: posts.success ? (posts.data as Post[]) : [],
    tags: tags.success ? (tags.data as Tag[]) : [],
  });
};

export default function Index() {
  const { posts, tags } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <div className="home-index divide-y-[1px]">
        <div>
          <div className="my-4">FEATURED CATEGORY</div>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-2 mb-4">
            {tags.map((tag) => {
              return (
                <div
                  key={tag.id}
                  className="bg-gray-50 py-4 text-center text-slate-400"
                >
                  <Link to={`/docs?tag=${tag.name}`}>{tag.name}</Link>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="my-4">FEATURED ARTICLES</div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
            {posts.map((post) => {
              return (
                <div
                  key={post.id}
                  className="bg-gray-50 text-center text-slate-400 rounded"
                >
                  <img
                    src={post.feature_image}
                    alt=""
                    className="object-cover h-48 w-96"
                  />
                  <div className="p-2">
                    <Link to={`/docs/${post.slug}`}>{post.title}</Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
