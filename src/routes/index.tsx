import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Flame, TrendingUp } from "lucide-react";
import { lists, categories, polls, posts, images } from "@/data/mock";
import { ListCard, Reveal, SectionTitle, Stars } from "@/components/site/bits";
import { PollCard } from "@/components/site/PollCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TopTenth — The Internet's Most Beautiful Top 10 Lists" },
      { name: "description", content: "Ranked lists of the greatest films, albums, games and history — vote, rate and argue with thousands of readers." },
      { property: "og:title", content: "TopTenth — Top 10 Lists, Ranked by You" },
      { property: "og:description", content: "Vote, rate and debate the greatest films, music, games and history." },
    ],
  }),
  component: Home,
});

function Home() {
  const feature = lists[0]!;
  const rest = lists.slice(1);
  const trending = [...lists].sort((a, b) => parseFloat(b.views) - parseFloat(a.views)).slice(0, 5);

  return (
    <>
      {/* Hero */}
      <section className="grain relative isolate overflow-hidden bg-ink text-ink-foreground">
        <motion.img
          src={images.hero}
          alt="Lone viewer in a golden-lit cinema"
          width={1600}
          height={912}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: "easeOut" }}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent" />
        <div className="mx-auto max-w-7xl px-5 pb-32 pt-28 md:pt-40">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xs uppercase tracking-[0.4em] text-gold">
            Ranked · Reviewed · Voted
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9 }}
            className="mt-6 max-w-4xl text-5xl leading-[1.02] md:text-8xl"
          >
            The world, ranked <em className="text-gold-gradient">beautifully</em>.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 0.4 }} className="mt-6 max-w-xl text-lg">
            Obsessively researched Top 10 lists on film, music, games and history — and you decide the final order.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-10 flex flex-wrap gap-4">
            <Link to="/lists/$slug" params={{ slug: feature.slug }} className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-medium text-primary-foreground transition hover:gap-4">
              Read today's list <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/polls" className="inline-flex items-center rounded-full border border-ink-foreground/30 px-7 py-3 backdrop-blur transition hover:border-gold hover:text-gold">
              Cast your vote
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-border py-4">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-2xl text-muted-foreground">
          {[...categories, ...categories].map((c, i) => (
            <span key={i} className="flex items-center gap-12">{c.name}<span className="text-gold">✦</span></span>
          ))}
        </div>
      </div>

      {/* Featured grid */}
      <section className="mx-auto mt-24 max-w-7xl px-5">
        <SectionTitle kicker="Editor's picks" title="This week's essential lists" />
        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2 lg:row-span-2"><ListCard list={feature} large /></Reveal>
          {rest.slice(0, 2).map((l, i) => (
            <Reveal key={l.slug} delay={0.1 * (i + 1)}><ListCard list={l} /></Reveal>
          ))}
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {rest.slice(2).map((l, i) => (
            <Reveal key={l.slug} delay={0.1 * i}><ListCard list={l} /></Reveal>
          ))}
        </div>
      </section>

      {/* Trending + poll */}
      <section className="mx-auto mt-32 grid max-w-7xl gap-12 px-5 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <SectionTitle kicker="Most read" title="Trending now" />
          <ol className="divide-y divide-border">
            {trending.map((l, i) => (
              <Reveal key={l.slug} delay={i * 0.05}>
                <li>
                  <Link to="/lists/$slug" params={{ slug: l.slug }} className="group flex items-center gap-6 py-5">
                    <span className="w-14 font-display text-5xl text-gold/70 transition group-hover:text-gold">0{i + 1}</span>
                    <div className="flex-1">
                      <h3 className="text-xl transition group-hover:translate-x-1">{l.title}</h3>
                      <p className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                        <TrendingUp className="h-3 w-3 text-gold" /> {l.views} reads · {l.author}
                      </p>
                    </div>
                    <img src={l.image} alt="" loading="lazy" className="hidden h-16 w-24 rounded-lg object-cover sm:block" />
                  </Link>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
        <div className="lg:col-span-2">
          <SectionTitle kicker="Live poll" title="Have your say" />
          <Reveal><PollCard poll={polls[0]} /></Reveal>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto mt-32 max-w-7xl px-5">
        <SectionTitle
          kicker="Browse"
          title="Pick your obsession"
          action={<Link to="/categories" className="hidden items-center gap-2 text-sm text-gold md:flex">All categories <ArrowRight className="h-4 w-4" /></Link>}
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.slice(0, 4).map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08}>
              <Link to="/categories/$slug" params={{ slug: c.slug }} className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-ink">
                <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-110 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
                <div className="absolute bottom-0 p-5 text-ink-foreground">
                  <h3 className="text-3xl">{c.name}</h3>
                  <p className="text-xs opacity-70">{c.count} lists</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Community rating strip */}
      <section className="mx-auto mt-32 max-w-7xl px-5">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
          {[["2.4M", "Monthly readers"], ["18K", "Votes today"], ["1,311", "Lists published"], ["4.8", "Avg reader rating"]].map(([n, l]) => (
            <div key={l} className="bg-card p-8 text-center">
              <div className="font-display text-5xl text-gold">{n}</div>
              <div className="mt-2 text-sm text-muted-foreground">{l}</div>
              {l.includes("rating") && <div className="mt-2 flex justify-center"><Stars value={5} /></div>}
            </div>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section className="mx-auto mt-32 max-w-7xl px-5">
        <SectionTitle kicker="The Journal" title="Stories beyond the list" action={<Link to="/blog" className="hidden items-center gap-2 text-sm text-gold md:flex">Read the blog <ArrowRight className="h-4 w-4" /></Link>} />
        <div className="grid gap-8 md:grid-cols-3">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="group block">
                <div className="overflow-hidden rounded-2xl">
                  <img src={p.image} alt={p.title} loading="lazy" className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <p className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold"><Flame className="h-3 w-3" /> {p.tag}</p>
                <h3 className="mt-2 text-2xl leading-snug group-hover:text-gold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
