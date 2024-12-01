import Link from "next/link";

export default function Page() {
    return (
        <div className="not-found">
            <h2 className="title text-2xl sm:text-2xl">Oops! Page not Found</h2>
            <p className="my-4">
                The page you are looking for might have been removed, had its name changed or is temporarily
                unavailable.
            </p>
            <Link href="/" className="text-lg underline text-sky-700">
                Home
            </Link>
        </div>
    );
}
