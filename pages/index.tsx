import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import { Box, Heading, VStack } from "@chakra-ui/react";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    props: { feed },
  };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Box className="page" pt={5}>
        <Heading>Public Feed</Heading>
        <VStack mt={5} spacing={5}>
          {props.feed.map((post) => (
            <Box
              key={post.id}
              w="full"
              shadow="lg"
              _active={{ shadow: "unset" }}
            >
              <Post post={post} />
            </Box>
          ))}
        </VStack>
      </Box>
    </Layout>
  );
};

export default Blog;
