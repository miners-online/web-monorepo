import globals from "@/globals";
import { SignInButton, SignUpButton, Show } from "@clerk/astro/react";
import CustomUserButton from "./CustomUserButton";

interface NavBarProps {
    currentUrl: string;
}

export default function NavBar({ currentUrl }: NavBarProps) {
     return (
        <nav className="navbar navbar-expand-md navbar-dark py-3">
            <div className="container">
                <a className="navbar-brand me-4" href="/">
                    {globals.meta.siteName}
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        {globals.navigation.map((item) => (
                            <li className="nav-item" key={item.title}>
                                <a
                                    className={`nav-link ${item.url === currentUrl ? "active" : ""}`}
                                    href={item.url}
                                >
                                    <i className={item.icon}></i> {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="d-flex">
                        <Show when="signed-out">
                            <SignInButton mode="modal">
                                <button className="btn btn-outline-light me-2">Sign In</button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="btn btn-outline-light me-2">Sign Up</button>
                            </SignUpButton>
                        </Show>
                        <Show when="signed-in">
                            <CustomUserButton/>
                        </Show>
                    </div>
                </div>
            </div>
        </nav>
    )
}
