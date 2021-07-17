import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import useSWR from 'swr'
import Link from 'next/link'
import Date from '../components/date'

const fetcher = url => fetch(url).then(res => res.json());

// https://pokeapi.co/api/v2/pokemon/tepig
function getBestPokemon() {

    const { data, error } = useSWR(
        "https://pokeapi.co/api/v2/pokemon/tepig",
        fetcher
      );
    
      if (error) return "An error has occurred.";
      if (!data) return "Loading...";
      return (
        <div>{data.name}</div>
      );


  }


  // In development (npm run dev or yarn dev), getStaticPaths runs on every request.
// In production, getStaticPaths runs at build time.

// export async function getServerSideProps() {
//   const allPostsData = getSortedPostsData()
//   return {
//     props: {
//       allPostsData
//     }
//   }
// }

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Tepig is cool.</p>
        {getBestPokemon()}
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}