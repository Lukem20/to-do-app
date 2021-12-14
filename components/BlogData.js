import  { getSortedList } from '../lib/data';

export async function getStaticProps () {
    const allData = await getSortedList();
    return {
      props: { allData },
      revalidate: 60
    }
  }

  export default function BlogData ( {allData} ) {
      return (
          <div>
            <h1>List of names</h1>
            <div className="list-group">
            {allData ?
                allData.map(({ id, name }) => (
                <Link href={`/${id}`}>
                <a key={id} className="list-group-item list-group-item-action">{name}</a>
                </Link>
                ))
            : null }
            </div>
        </div>
      );
  }