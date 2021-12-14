import Link from 'next/link';

//Put all the global HTML you want on every page in this component.

export default function Layout ( { children, home } ) {
  return (
    <div>
      <header>
        <a href="https://github.com/Lukem20">My GitHub</a>
      </header>
      <main>{children}</main>
      {!home && (
          <Link href="/">
            <a className="btn btn-primary mt-3">Back to Home</a>
          </Link>
        )
      }
    </div>
  );
}