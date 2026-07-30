"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FaqItemProps {
  question: string;
  answer: string;
}

function FaqItem({ question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`faq-item border-b border-white/9 transition-all ${open ? "open" : ""}`}>
      {/* Question Row */}
      <div
        onClick={() => setOpen(!open)}
        className="faq-q flex justify-between items-center py-6.5 px-1 cursor-pointer gap-5 select-none"
      >
        <h4 className="text-lg font-medium text-ink hover:text-gold-soft transition-colors duration-300">
          {question}
        </h4>
        <span className="plus w-[22px] h-[22px] relative flex-shrink-0">
          {/* Vertical/Horizontal lines making a + that turns into a - */}
          <span className="absolute top-1/2 left-0 w-full h-[1px] bg-gold-soft -translate-y-1/2" />
          <span
            className={`absolute left-1/2 top-0 h-full w-[1px] bg-gold-soft -translate-x-1/2 transition-transform duration-400 ease-custom ${
              open ? "rotate-90 scale-y-0 opacity-0" : "rotate-0 scale-y-100"
            }`}
          />
        </span>
      </div>

      {/* Answer Drawer */}
      <div
        ref={contentRef}
        style={{
          maxHeight: open ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
        className="faq-a overflow-hidden transition-[max-height] duration-500 ease-custom"
      >
        <p className="text-ink-dim text-[14.5px] leading-[1.5] pb-6.5 px-1 max-w-[600px]">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function Faq() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reveals = containerRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
          },
        }
      );
    });
  }, []);

  const faqs = [
    {
      q: "What's your typical turnaround time?",
      a: "Most brand films and commercials take 2–4 weeks from ingest to final master, depending on footage volume and revision rounds. Rush turnarounds are available for an additional fee.",
    },
    {
      q: "Do you shoot, or edit only?",
      a: "Editing, colour, and sound are my focus. I regularly collaborate with a network of trusted DPs and producers if you need production support too.",
    },
    {
      q: "What file formats and delivery specs do you support?",
      a: "Any camera-native format (ProRes, RAW, H.264/265, R3D) on the way in, and masters delivered to whatever spec your platform requires — broadcast, cinema DCP, or web.",
    },
    {
      q: "How many revision rounds are included?",
      a: "Two structured revision rounds are included in every project quote. Additional rounds are billed hourly and always scoped before starting.",
    },
    {
      q: "Can you work with my existing brand guidelines?",
      a: "Always. Send over brand fonts, colour references, and prior work, and I'll build titles, grades, and pacing to match your existing identity.",
    },
  ];

  return (
    <section ref={containerRef} id="faq" className="py-[150px] md:py-[150px] py-[100px] relative z-[2]">
      <div className="wrap max-w-[820px]">
        {/* Section Head */}
        <div className="sec-head flex justify-between items-end gap-10 mb-16 flex-wrap">
          <div>
            <div className="eyebrow flex items-center gap-[10px] font-mono text-[12px] tracking-[0.18em] uppercase text-gold-soft mb-[18px] reveal">
              <span className="w-[22px] h-[1px] bg-gold-soft" />
              FAQ
            </div>
            <h2 className="h-display font-display text-[clamp(34px,5vw,58px)] font-bold tracking-tight leading-[1.02] reveal">
              Before you
              <br />
              reach out.
            </h2>
          </div>
        </div>

        {/* Faqs List */}
        <div id="faqList">
          {faqs.map((faq, idx) => (
            <div key={idx} className="reveal">
              <FaqItem question={faq.q} answer={faq.a} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
