import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { Text, Heading, Box } from "@chakra-ui/react";

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author
    ? post.author.name
    : "Unknown author";
  return (
    <Box
      p={5}
      border="1px solid"
      borderColor="gray.500"
      borderRadius="md"
      onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
    >
      <Heading size="md">{post.title}</Heading>
      <Text fontSize="sm">By {authorName}</Text>
      <ReactMarkdown source={post.content} />
    </Box>
  );
};

export default Post;
