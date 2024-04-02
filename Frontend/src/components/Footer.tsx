const Footer = () => {
  return (
    <div className="">
      <div className=" bg-black text-white">
        <div className="grid gap-10 divide-x divide-neutral-500 lg:grid-cols-2 lg:gap-0">
          <div className="grid gap-y-10 px-10 pb-5 pt-16 md:grid-cols-3">
            <div className="space-y-5">
              <h4 className="text-2xl font-medium"></h4>
              <div>
                <a href="/home">Home</a>
              </div>
              <div>
                <a href="/products">Collections</a>
              </div>
              <div>
                <a href="/cart">Cart</a>
              </div>
              <div>
                <a href="/checkout">Checkout</a>
              </div>
              <div>
                <a href="/blog">Blogs</a>
              </div>
              <div>
                <a href="/blog/the-evolution-of-sneaker-culture-a-historical-perspective">
                  Blog Single
                </a>
              </div>
              <div>
                <a href="/collections/yellowLow">Product Single</a>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 16 16"
                className="text-2xl"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
              </svg>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 16 16"
                className="text-2xl"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z" />
              </svg>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 16 16"
                className="text-2xl"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col justify-center p-5 md:p-20">
            <div className="space-y-5">
              <h1
                className="text-4xl font-semibold md:text-[80px]"
                style={{ lineHeight: "1em" }}
              >
                Newsletter
              </h1>
              <p className="w-[80%] text-sm text-neutral-200">
                Get the latest news about us and sign up and get 20% off today.
                Never miss a single promo
              </p>
              <div className="flex items-center rounded-full border border-neutral-500">
                <input
                  type="text"
                  className="block w-full focus:ring focus:ring-transparent focus:ring-opacity-25 disabled:bg-neutral-800 rounded-none text-sm font-normal h-12 px-4 py-3 border-transparent bg-transparent placeholder:text-sm placeholder:text-neutral-200 focus:border-transparent"
                  placeholder="Your email"
                />
                <button
                  className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors
            text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  disabled:bg-opacity/70 rounded-full bg-primary text-white hover:bg-primary/80 hover:text-white "
                >
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-neutral-500" />
        <div className="flex flex-col items-center justify-between gap-3 px-10 py-5 md:flex-row md:gap-0">
          <div className="flex items-center gap-1 text-sm md:text-base">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M11.88 9.14c1.28.06 1.61 1.15 1.63 1.66h1.79c-.08-1.98-1.49-3.19-3.45-3.19C9.64 7.61 8 9 8 12.14c0 1.94.93 4.24 3.84 4.24 2.22 0 3.41-1.65 3.44-2.95h-1.79c-.03.59-.45 1.38-1.63 1.44-1.31-.04-1.86-1.06-1.86-2.73 0-2.89 1.28-2.98 1.88-3zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
            <span>2023 LuxLoom. All rights reserved</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="/">Terms of service</a>
            <a href="/">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
