import { getAllIds, getData } from '../lib/data';
import Layout from '../components/Layout';

  // Create an instance of the getStaticProps() to return data of one person
export async function getStaticProps( { params } ) {
  const itemData = await getData( params.id );
  return {
    props: { itemData },
    revalidate: 60
  };
}

  // Create an instance of the getStaticPaths() to report to next.js all possible dynamic URLs
export async function getStaticPaths () {
  const paths = await getAllIds();
  return {
    paths, 
    fallback: false
  };
}

  // Make a React component to display all the details about a person when a dynamic route matches.


  export default function Entry( {itemData} ) {
    return (
      <Layout>
        <article>
          <div>
            <h5>{itemData.post_title}</h5>
            <h6>{itemData.user_login}</h6>
            <div dangerouslySetInnerHTML={{__html: itemData.post_content}} />
          </div>
        </article>
      </Layout>
    );
  }