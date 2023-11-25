import React from 'react';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import type { MetaFunction } from '@vercel/remix';
import type { LoaderFunctionArgs } from '@remix-run/node';

import { api, Post } from '~/model/ghost';

export const meta: MetaFunction = () => {
  return [
    { title: 'Docs - ρV' },
    {
      name: 'description',
      content: 'undefined project - ρV',
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const tag = url.searchParams.get('tag') || '';

  const response = await api.posts
    .browse({
      limit: 15,
      filter: tag ? `visibility:public+tags:${tag}` : 'visibility:public',
    })
    .fields({
      id: true,
      title: true,
      slug: true,
      published_at: true,
    })
    .fetch();

  if (!response.success) {
    throw new Error(response.errors.join(', '));
  }

  return json({ posts: response.data as Post[] });
};

const DocIndex: React.FC = () => {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="docs-index">
      <div className="docs-header border-b border-gray-100 pb-4">
        <h1>Docs</h1>
      </div>
      <div className="docs-content py-4">
        <div className="flex flex-col divide-y">
          {posts.map((post) => {
            const { id, slug, title } = post;
            return (
              <div key={id} className="flex flex-row justify-between py-3">
                <Link to={`/docs/${slug}`}>{title}</Link>
                <span>
                  {post.published_at &&
                    new Intl.DateTimeFormat('en-US').format(
                      new Date(post.published_at)
                    )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DocIndex;
