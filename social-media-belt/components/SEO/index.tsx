import Head from "next/head";

type Props = {
  title: string
  description?: string
}

const SEOComponent = ({ title, description }: Props) => (
  <Head>
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
  </Head>
)

export default SEOComponent