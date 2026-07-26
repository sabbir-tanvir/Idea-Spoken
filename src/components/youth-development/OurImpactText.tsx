import React from 'react';

export default function OurImpactText() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24 lg:py-32 bg-linear-to-br from-slate-50 via-indigo-50/70 to-emerald-50/60">
      <div className="absolute inset-0 opacity-70">
        <div className="absolute -top-24 left-0 h-56 w-56 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="rounded-4xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.10)] backdrop-blur-md md:p-10 lg:p-12">
            <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold tracking-wide text-indigo-700">
              Our Impact
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              মানুষের পাশে দাঁড়ানোই আমাদের আসল কাজ
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl md:leading-9">
              আইডিয়ার স্বেচ্ছাসেবকদের বিভিন্ন কাজ সারাদেশ জুড়ে উদাহরণ সৃষ্টি করেছে। প্রতি সপ্তাহে অনাহারী মানুষের কাছে আইডিয়া ফ্রাইডে মিল পৌঁছে দেওয়া অন্যতম উদ্যোগ, যা দেশের বিভিন্ন প্রান্তের শিক্ষার্থীরাও অনুকরণ করছে। এছাড়াও আইডিয়া লস প্রজেক্ট, ভিন্নধর্মী থার্টি-ফার্স্ট উদযাপন এবং অন্যান্য মানবিক কার্যক্রমে মানুষের অংশগ্রহণ বাড়ছে।
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/80 p-4 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">Food Support</p>
                <p className="mt-2 text-base font-medium text-slate-800">প্রতি সপ্তাহে অনাহারীদের কাছে খাবার পৌঁছে দেওয়া</p>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Reach</p>
                <p className="mt-2 text-base font-medium text-slate-800">৬৪টি জেলায় ভালো মানের খাবার পৌঁছায়</p>
              </div>
              <div className="rounded-2xl border border-amber-100 bg-amber-50/80 p-4 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">Model</p>
                <p className="mt-2 text-base font-medium text-slate-800">ছোট উদ্যোগ থেকে বড় সামাজিক পরিবর্তন</p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-950 px-5 py-5 text-white shadow-lg md:px-6">
              <p className="text-lg font-semibold md:text-xl">
                “ছোট অবদানও বড় পরিবর্তন আনতে পারে”
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-300 md:text-base">
                এই বিশ্বাস নিয়েই আইডিয়া কাজ করে যাচ্ছে, যেন স্বেচ্ছাসেবার সংস্কৃতি আরও বিস্তৃত হয় এবং আরও মানুষ অংশ নিতে পারে।
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-4xl border border-white/70 bg-white/85 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.10)] backdrop-blur-md md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">How You Can Help</p>
              <h3 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
                আপনিও অংশ নিতে পারেন
              </h3>
              <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">
                আপনিও অংশ নিতে পারেন এমন মানবিক উদ্যোগে। সাধ্য অনুযায়ী নিজের এলাকায় ভালো কাজ করে অথবা আমাদের মাধ্যমে এই কার্যক্রমের সঙ্গে যুক্ত হয়ে মানুষের পাশে দাঁড়াতে পারেন।
              </p>

              <div className="mt-6 grid gap-3">
                <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-500" />
                  <p className="text-sm leading-7 text-slate-700 md:text-base">
                    নিজের এলাকায় নিয়মিত ছোট মানবিক উদ্যোগ শুরু করুন।
                  </p>
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <p className="text-sm leading-7 text-slate-700 md:text-base">
                    আইডিয়ার স্বেচ্ছাসেবী কার্যক্রমে সময়, শ্রম বা সম্পদ দিয়ে সহায়তা করুন।
                  </p>
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-500" />
                  <p className="text-sm leading-7 text-slate-700 md:text-base">
                    অন্যদেরও এই মানবিক কাজগুলোর অনুপ্রেরণা হয়ে উঠতে উৎসাহিত করুন।
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-4xl border border-indigo-200/70 bg-linear-to-br from-indigo-600 via-violet-600 to-slate-900 p-6 text-white shadow-[0_20px_80px_rgba(79,70,229,0.25)] md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-100/80">Community Motto</p>
              <p className="mt-4 text-2xl font-bold leading-tight md:text-3xl">
                আমরা যোগ হলে সবারই খাবার মেলে
              </p>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/85 md:text-base">
                এই একটিই স্লোগান আইডিয়ার মানবিক কাজকে সংযুক্ত রাখে, যেখানে খাদ্য, সহমর্মিতা ও দায়িত্ববোধ একসাথে এগিয়ে যায়।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
