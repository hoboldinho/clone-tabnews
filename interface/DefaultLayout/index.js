import Head from "next/head";
import { PageLayout, Header } from "@primer/react";
import styles from "./index.module.css";

const contentWidthClasses = {
  small: styles.smallContent,
};

export default function DefaultLayout({
  children,
  metadata = {},
  contentWidth,
}) {
  const extraContentClassName = contentWidthClasses[contentWidth];

  return (
    <>
      <Head>
        <title>
          {metadata.title ? `${metadata.title} · Hoboldinho` : "Hoboldinho"}
        </title>

        {metadata.description && (
          <meta name="description" content={metadata.description} />
        )}
      </Head>

      <Header>
        <Header.Item full>
          <Header.Link href="/">Hoboldinho</Header.Link>
        </Header.Item>
        <Header.Item>
          <Header.Link href="/cadastro">Cadastro</Header.Link>
        </Header.Item>
        <Header.Item>
          <Header.Link href="/login">Login</Header.Link>
        </Header.Item>
      </Header>

      <PageLayout>
        <PageLayout.Content
          width={contentWidth}
          className={extraContentClassName}
        >
          {children}
        </PageLayout.Content>
        <PageLayout.Footer divider="line">
          © {new Date().getFullYear()} Hoboldinho
        </PageLayout.Footer>
      </PageLayout>
    </>
  );
}
