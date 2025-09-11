import { tinaField, useTina } from "tinacms/dist/react";
import type { PostQuery, PostQueryVariables } from "../__generated__/types.ts";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import FormattedDate from "../../src/components/react/FormattedDate.tsx";

type Props = {
  variables: PostQueryVariables;
  data: PostQuery;
  query: string;
};

export default function AdminBlogPost(props: Props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const post = data.post;

  return (
    <article>
      <div
        data-tina-field={tinaField(post, "heroImage")}
        className="hero-image"
      >
        {post.heroImage && (
          <img width={1020} height={510} src={post.heroImage} alt="" />
        )}
      </div>
      <div className="prose">
        <div className="title">
          <div className="date" data-tina-field={tinaField(post, "pubDate")}>
            <FormattedDate date={post.pubDate || ""} />
            {post.updatedDate && (
              <div
                className="last-updated-on"
                data-tina-field={tinaField(post, "updatedDate")}
              >
                Last updated on <FormattedDate date={post.updatedDate} />
              </div>
            )}
          </div>
          <h1 data-tina-field={tinaField(post, "title")}>{post.title}</h1>
          <hr />
        </div>
        <div data-tina-field={tinaField(post, "body")}>
          <TinaMarkdown content={post.body} />
        </div>
      </div>
    </article>
  );
}
