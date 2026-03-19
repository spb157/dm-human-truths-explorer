import { useState, useCallback, useRef, useEffect, useMemo } from "react";

const DM_LOGO_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAj0AAADICAIAAACMM8fVAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAuaUlEQVR42u2deXgVRbrGv6ruzoIEMMgaBCIMm0YEIqAQRDZZXcBxALcRARER5F5AQGYUGUdGVFQEFJXRyy4gslwEhUERA8p22QRlCQmEQFgTCAmnl7p/fKTnTEBkSU66D+/v4fE5QnJOd52q7633q6+qhVKKQNFg27amacnJyc2aNRNCeK2p+ZJKlCixffv2+Ph4x3GklPjWAAAeB3EKAAAAdAsAAACAbgEAAADQLQAAANAtAAAAALoFAAAAQLcAAABAtwAAAADoFgAAAADdAgAAAN0CAAAAoFsAAAAAdAsAAAB0CwAAAIBuAQAAANAtAAAA0C0AAAAAugUAAABAtwAAAEC3AAAAAOgWAAAAAN0CAAAA3QIAAACgWwAAAAB0CwAAAHQLAAAAgG4BAAAA0C0AAADQLQAAAAC6BQAAAEC3AAAAQLcAAAAA6BYAAAAA3QIAAADdAgAAAKBbAAAAQLjpllJKKYXvFQCA0BGut6/7sXG5fZVSQggiEvnw6+AfdhzHfS2CwCgF4HoO0AyHAillgbDgOM4lgoyv7929teB7D46c/K8XRk63EaBbV9bQmqb9bsNxd5RScitrmnbhz9i27TiO21khYwCEPRxGlFK6rl90yDuO40YDDiAXDR0cx91w75cbdxxH0zQp5UVDIt8a/xPf1yV+zAseQPdsW7O0FGjo7Ozs9PT0Q4cOHTx48MiRI4cOHcrOzs7KysrKyjp79qwQIjc3l4giIyOllDfccENsbGzp0qUrVqwYFxdXtWrVm2++uWrVqjExMcHvadt28LwDABBO7ooFyZWiQCCQkpKya9eu3bt3p6WlZWZmZmZm5uXlBQIBpRSHjpIlS7qho0qVKtWrV69WrVqVKlWioqIK6EHwO3vtxlmK+PI44mVkZKSkpOzZs+fAgQMHDx48ceLE8ePHc3NzLcvKy8uLjIw0DINvv0yZMqVKlSpTpkyVKlXKly9ftWrVypUrV6pUKSIiooCMFUvw9JBusVZxE7NiEdHJkyd//fXXbdu2bdq0afv27bt37z527JhlWVf3EZqmVahQoW7duomJiY0bN7799ttr1qzpahi/Lbs6DHhvRiEiR5EicgQZpJTyyhclBZmkpBIakSOIUPHkhXhi27ZhGDzA09LS1q5du2LFijVr1uzbty8QCFzRu0VGRsbFxd1+++1NmjS5884769evf9NNNwVbEI/EDZYrItJ1Xdd1vvH169d///33P/30044dO7Kzs6/unUuUKBEXF1e3bt3bb7+9QYMGCQkJ8fHx/BEFnEYIblN4YS2O79ltAsuyNm7cuHLlyh9++GHr1q0HDx4seNH/6dODb8F97f4rv+AUgZu0ZUqWLFmnTp3mzZvfd999zZs3L1mypHsBhdILeb6TnJzcrFkzIYTXlj35kkqUKLF9+/b4+Hjudn6QLkWKhUEReUO4BJFylHCIdCIWU+9OfdwJoje59tjnpsWIKCsra9GiRbNnz05OTj516lTwpxQY4MGrPgVCh7tU4VKxYsXExMROnTq1b9++evXq7ngvxrRN8F0TUUpKypIlSxYtWrRhw4bgG3eD50XD5oUtwP/EWhhMdHR0zZo1GzVq1KZNm5YtW8bFxQXb0KJuh+IMpjw1cLvp2bNnV69evXTp0pUrV/7888/Bbcdfhis8V33NnJDlj3MnJswtt9zSrl27rl27tmzZ0jAM96v6rTwvdKt4Yq5ypDhN6gYik4TljYSBIMpTTklLSp2UUBrBrl9zZLi6qMeDmmfAe/fu/eyzz6ZNm7Z//3433cJ9/kIduszQwQQLf0xMTOvWrf/4xz926dIlJiaGZ70hsx0FQg1/+tKlS2fMmPHVV1+dPn3avXEpJV/2tQdPbsPgpFeZMmWaNWvWpUuX9u3bV6tWrXBn/x7SLe46riZv3rx5zpw58+fP37Nnj/szuq5fXQ+7im8iuCPedtttjz/+eM+ePatUqXKNvRC6VbidhoQIHH3DOTNdV7FK5pAgUsV+wYLItER8ZKUP7YiyhrIUaeTVRDPrwTfffLNjxw4eX17rkKZp1qtXr127dm511VXE7gMHDrz77rsff/xxVlaWO/Us3EjiTn/duW+NGjV69er11FNPVapUqaijdgH3zHEsNzf3888/f++99zZt2uTKVaHf+IXBM9gAlC5dul27dk8++WTbtm15JayIPGiog2nwhCgQCMyfP//TTz9duXKla26uekJUKNkJ9zsoW7Zst27d+vfvX79+fW79q1iAhW4VatdxSEgzY6CTNSGCSAnPZAkVWVp5vfoPyqipOZYSkoQQnvRc3CEfeeSRuXPnevZ77tat27x581wRuqIUWV5e3vjx4995553MzEwiMgzjGk3GlQpYhQoVevXqNXDgwIoVKwZLaVEnBv/nf/7nrbfe2rp1qxtFQ5kN5pRYsIDVr1+/V69eTzzxRJkyZYpCvUJtZoUQuq5nZ2dPnDixcePGPXv2/Prrr1nJpJS2bVuWxeucoU5AOQ5/tJRS1/Xjx49PmTKlSZMmTz/99NatW9loW5aFTc3FiyMNKaQQBkkphCaELO4/mpBS0g0kpVSkhCShyNuJwpiYGF3Xo6KidI/Bl+QuM19m7LYsi+PmypUrmzVrNnLkyMzMTC52N02zqIMJB2s3bhw5cuT1119PTEycMGFCIBDQNK2IgoZ71z/88EPr1q2ffPJJN0xxFA3lEiZ/Cxze+Rq2bNkyaNCgBg0ajBs37sSJEyyuFy6SeV23eMqjadrZs2cnTZrUqFGjAQMGbNmyRdd1nh2EuKF/V8CEEIZhBAKBqVOnNm3atH///unp6TwYvLymHfYochQ5FPRfb/zxulZd2MM9yxWNL57y5ubmDh06tG3btps2beJK7tBPMYPjRnp6+sCBA1u0aJGcnMy5pcINGnzXOTk5Q4cObdmy5b/+9S8OpLwztTiHp1Lu7lhN0/bv3z9s2LBGjRpNnjyZrWdhTSNkCL5O0zTZJM6YMaNp06bPPffcnj17XINVLO7qcr4A0zSJiEfF5MmTExMT33vvPZ5YmaYJ4wVA8Y7QQCCg6/qOHTtat2795ptv8mTfNM1ijN0cN9h7/fjjjy1btnzllVc4jnM8KRRnw6sPzZs3f/PNN/l/2e54am7ketD9+/f3798/KSlp5cqVrkvxtG6xczQMY8OGDe3bt3/ssce2bdvGisUTK49HfzcLoev64cOHBw0a1Lp1640bNxqGcWFVPQAglPP6iIiIhQsXtmjRYu3atbquc6z0jqNlORk9evR9992XmppqGMY1xmsuwdB1/d13323VqtX//d//sZnzlGJd2A5SSsMw1q1b16ZNm4EDB544cULX9WtsiiLULdM0NU3Lzc0dOXJkUlLS8uXL3fSrvyI+qxfPHb777rukpKSxY8dyHQdWvAAIfTTk7Z7vvPPOQw89xMsn1z6FL4pZOxEZhrFy5coWLVqsXr1a1/WrTtWwfTl37tzTTz/9wgsvsNf04F3/lnpxJnPChAnNmjVbtWqVruvXIgSyiC5UKWUYxg8//JCUlPT666+fO3fOTb/6NNC7c6jc3NwRI0Z06tTp4MGD3BERSgAI2SSSV8qHDRs2ePBgnj561nBw2lDX9bS0tPbt28+aNcswjKu4Wl4cyszM7NChw9SpUyMiIgol2xbiqT8vy+3atat9+/Zjx451d5V5Qrfcksdx48a1atWKV0qFEJ7tW1d6d2zVly5dmpSUtHr16oiICO8UlQAQ3k6LRWvAgAHjxo1zt3h6/LItyzIMIy8vr2fPnh999NGV+iQWrf3797dp02bVqlW+Djg89bdte8SIET169Dh9+vTVTTtk4fYqLv08evTogw8+OGzYME4VFu9KaRHNHbgntWvXburUqdwRkTAEoEjHHRc4PPvssxMnTuRB55fAYpom7/Tq27fvlClTLj9Pw6KVkpLSoUOHbdu2cZGzr8MpZ910XZ89e3abNm1SU1OvIs0rC/eCIiIi1q1bd/fddy9cuJDNbHjYrN/qT4FA4Omnnx4zZkxERAQeWQlAkY44XdeHDBnywQcfRERE+C6wuMfSP/PMM/PmzbuchKHrtDp06LBr1y7DMMJjVcItq/npp59atWrFxXpXJF2ysL4S9sJz585t27Ytl7n7fV5wOQOJiDRN++tf//pf//VfbHghXQAUepjjVaKxY8e+9dZb11Ld4IWIIaV84oknkpOTL+0z+CyMI0eOdO7c+ZdffgmzpXR3G8O+ffvuu+++zZs3X5F0yUK5Ap4KjR8//pFHHjlz5gwX2l0nI0opFRERMX78+Oeee46LZCBdABRuuDcMY+bMmSNGjGCb4t8hxqnO3Nzcnj17ZmRkaJp20ck9nySZl5f3yCOP8GGSYRlR2e1kZGR07NiRj6G4TBstr/1rcBzHMIxRo0ax57jqEhH/dkSeDE6aNGnYsGGQLgAKN7Tpur5x48a+ffvyaTV+H1wsw6mpqU899ZT7FOYLnYAQonfv3qtXr772jV9ehoPn4cOH77///r1793LVRtHqlnuw46BBg1577TW/lPcUheviicO4cePGjh0brpMjAEIf4qWUx44d69GjR05OTnisl7tpz+XLl7/zzjsXRmqW6n/84x8zZswIb9EKdl1paWkPPfTQyZMn+XzzotItlihd1wcNGvTee+/53b8XyhjTdX3EiBFz5sy5HnobACEI8VLKfv367d69mw93D6dwoWnayy+/zGlA99bYja1YseKll166fpI3LF3btm3r2bPnRT1o4eiWuwl35MiR7733nn9XSgsRPmZG07S+ffteUa4WAPBbE8H3339//vz54bfBn6NlTk7Of//3f7thmmsOjx071qdPH64Xv07SV+xBDcNYtmzZSy+99LubuuRVdynDMMaOHfv6669f3Q7wcG19IUR2dvbjjz/O9SloEwCu2o7s2rVrxIgRl7nm4dN7XL58+eLFi7m2kKs2nn/++f3794eZv7x81/WPf/zjiy++uPS8/4oDqyuMn332GXcpbLkt0PS6rm/btm348OEefKQsAH6ZAtq2/fzzz585c8Z1J+HKqFGj8vLyiEjX9blz586ePZuPa7g+v3QhxHPPPZeenn4J13XFusVO61//+tczzzzDRZwIzReVrkmTJn311Vf+OkYMAC8ELyKKjIz86KOPVqxYEd62g3Oh27Ztmz9/vqZpx48fHzZsmAefjR4yuNDv8OHDzz///CXmK/JK35Sfp9KzZ89z586F/TzoWsaeUmrIkCHsTdEgAFxRnMnIyHj11Ve9fGZuIcYKIcTEiROFEK+++ur+/fuDyzSuz3m/pmkLFiyYNWvWb2UL5RW1r1KKd8wdOXIkXJPOhTWNMgzj559/njJlyo033ogGAeAynRbXvo8ePTojI4M3g4b35JgrBjds2DBx4sTPPvvsepDqy9TyESNGHD9+/KLuU15R+2qaNnTo0LVr16IW43JmDUKIkSNHPvroozCmAFyOzSKi//3f/+3ateu0adPC+HTTi4aLgQMHZmVl4YG0lH+qSFpa2t///veLCrm8/GblE3wnTpyIzUmXb0+zs7M3bdqE1gDgMv1Wdnb2ggULzp49e10dVO3K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";
const DmLogo = ({ height = 22 }) => (
  <img src={DM_LOGO_SRC} alt="d+m" style={{ height: `${height}px`, display: "block" }} />
);

const DM = {
  yellow: "#FFD900", black: "#111111", nearBlack: "#1A1A1A",
  grey600: "#555555", grey400: "#999999", grey200: "#D4D4D4", grey100: "#EEEEEE", grey50: "#F7F7F7",
  white: "#FFFFFF", red: "#DB2B39",
};
const Q_COLORS = { topLeft: "#0A3A75", topRight: "#2A8C51", bottomLeft: "#999999", bottomRight: "#EB573F" };

/* ─── DEMO DATA ─── */

const SAMPLE_META = {
  territory: "The Language of Career Reinvention",
  client: "Workday", project: "Talent Aspiration Study",
  markets: ["UK", "US", "Australia"],
  timeScope: "2025", date: "2026-03-01",
  researchObjective: "How do mid-career professionals describe the aspirations and barriers shaping career change \u2014 and what does their language reveal about the deeper truths driving (or blocking) reinvention?",
  goingInHypotheses: [
    "People frame career change as liberation but experience it as loss",
    "Financial language dominates barrier talk even when the real barrier is identity",
    "The language of reinvention borrows heavily from wellness and self-help culture",
  ],
  corpusNotes: "18 depth interviews across 3 markets. 12 mid-career changers, 6 people considering change. Mix of voluntary and involuntary transitions.",
  gaps: [
    "No participants from non-English-speaking backgrounds",
    "Under-represented: blue-collar to white-collar transitions",
    "Limited longitudinal perspective \u2014 all interviews at a single point in time",
  ],
};

const SAMPLE_PARTICIPANTS = [
  { id: "P01", pseudonym: "Sarah", demographics: "Female, 38, London, Parent of two", segment: "Voluntary career changer" },
  { id: "P02", pseudonym: "Marcus", demographics: "Male, 42, Manchester, Single", segment: "Redundancy-triggered changer" },
  { id: "P03", pseudonym: "Priya", demographics: "Female, 35, Sydney, Married", segment: "Considering change" },
  { id: "P04", pseudonym: "James", demographics: "Male, 45, New York, Divorced", segment: "Voluntary career changer" },
  { id: "P05", pseudonym: "Aisha", demographics: "Female, 31, London, Single", segment: "Voluntary career changer" },
  { id: "P06", pseudonym: "Tom", demographics: "Male, 39, Melbourne, Parent of one", segment: "Redundancy-triggered changer" },
  { id: "P07", pseudonym: "Elena", demographics: "Female, 44, Chicago, Married", segment: "Considering change" },
  { id: "P08", pseudonym: "David", demographics: "Male, 36, Brisbane, Single", segment: "Voluntary career changer" },
  { id: "P09", pseudonym: "Rachel", demographics: "Female, 40, Leeds, Parent of three", segment: "Considering change" },
  { id: "P10", pseudonym: "Chris", demographics: "Male, 33, San Francisco, Married", segment: "Voluntary career changer" },
  { id: "P11", pseudonym: "Fatima", demographics: "Female, 37, London, Married", segment: "Redundancy-triggered changer" },
  { id: "P12", pseudonym: "Ben", demographics: "Male, 41, Perth, Divorced", segment: "Voluntary career changer" },
];

const SAMPLE_TRUTHS = [
  { id: 1, name: "The Golden Cage", description: "Career stability described as imprisonment. People articulate comfort and security while their language reveals suffocation, restlessness, and a sense of identity erosion. The cage is golden because the salary and status make it hard to leave.", x: 0.3, salience: 78,
    emotionalRegister: { primary: "Frustration", secondary: "Resignation", rationale: "Dominant emotion is chronic frustration tempered by a resigned acceptance that comfort is hard to walk away from." },
    metaphorFamily: { primary: "CAREER IS A CAGE", examples: ["trapped", "stuck", "handcuffed to the salary", "comfortable prison", "gilded cage", "can\u2019t breathe"], rationale: "Confinement metaphors dominate. The career isn\u2019t described as bad \u2014 it\u2019s described as constraining. Freedom is the implied opposite." },
    reissMotivation: { primary: "Independence", secondary: "Tranquility", notes: "The desire for autonomy clashes directly with the desire for security and calm." },
    archetype: { primary: "Explorer", secondary: "Everyman", notes: "Explorer yearning trapped inside Everyman obligations. The tension between these two archetypes IS the truth." },
    culturalStrategy: { orthodoxy: "A good career means stability, progression, and financial security.", contradiction: "People describe their stable careers using the language of captivity, not contentment.", opportunity: "The brand that names the cage \u2014 and offers a key, not just a window \u2014 earns permission to lead the reinvention conversation." },
    quotes: [
      { text: "I earn well. I have a title people respect. And every Sunday night I feel this weight in my chest.", participant: "P01", market: "UK" },
      { text: "My wife says I should be grateful. And I am. But grateful and alive aren\u2019t the same thing.", participant: "P04", market: "US" },
      { text: "It\u2019s like\u2026 I built this beautiful house and then realised I can\u2019t leave it.", participant: "P03", market: "Australia" },
      { text: "The money is handcuffs. Very nice handcuffs. But handcuffs.", participant: "P02", market: "UK" },
    ],
    participants: ["P01", "P02", "P03", "P04", "P06", "P09"],
    linguisticPatterns: ["Confinement metaphors", "Hedging: \u2018I know I should be grateful, but\u2019", "Physical sensation language: weight, chest, breathing", "Passive voice: \u2018I found myself\u2019 rather than \u2018I chose\u2019"],
    relatedTruths: [2, 4],
  },
  { id: 2, name: "The Leap of Faith", description: "Career change framed as a dramatic, irreversible jump. People don\u2019t describe gradual transition \u2014 they describe leaping, falling, jumping. The metaphor creates a binary: stay safe or risk everything. This framing itself becomes a barrier.", x: 0.15, salience: 65,
    emotionalRegister: { primary: "Anxiety", secondary: "Hope", rationale: "Fear of the fall dominates, but there\u2019s an undercurrent of excitement about what\u2019s on the other side." },
    metaphorFamily: { primary: "CHANGE IS A LEAP", examples: ["took the leap", "jumped ship", "the safety net", "free fall", "landing on my feet", "the edge"], rationale: "Vertical metaphors with gravity. Change is always described as downward-risky, never as lateral or upward movement." },
    reissMotivation: { primary: "Curiosity", secondary: "Honor", notes: "The desire to explore new territory competes with the need to honour commitments and maintain standing." },
    archetype: { primary: "Hero", secondary: "Innocent", notes: "Hero\u2019s journey framing \u2014 but the Innocent\u2019s fear of the unknown creates paralysis at the threshold." },
    culturalStrategy: { orthodoxy: "Career change requires courage and a willingness to risk everything.", contradiction: "The \u2018leap\u2019 framing is itself the problem. It makes change feel all-or-nothing, which keeps people frozen.", opportunity: "Reframe change from a leap to a bridge. Make the transition feel navigable, not binary." },
    quotes: [
      { text: "Everyone talks about taking the leap. But nobody talks about what happens when you\u2019re mid-air and you can\u2019t see the ground.", participant: "P05", market: "UK" },
      { text: "I\u2019ve been standing on the edge for two years. Just\u2026 standing there.", participant: "P07", market: "US" },
      { text: "When I finally jumped, the worst part wasn\u2019t the fall. It was the three seconds of silence before anything happened.", participant: "P08", market: "Australia" },
      { text: "My therapist said \u2018what\u2019s the worst that could happen?\u2019 And I had a list. A detailed, colour-coded list.", participant: "P09", market: "UK" },
    ],
    participants: ["P05", "P07", "P08", "P09"],
    linguisticPatterns: ["Gravity/vertical metaphors", "Binary framing: safe vs. risk", "Time language: \u2018been thinking about it for years\u2019", "Conditional tense: \u2018I would if\u2019"],
    relatedTruths: [1, 5],
  },
  { id: 3, name: "The Identity Audit", description: "Career change experienced as an identity crisis, not a practical problem. People describe losing who they are, not just what they do. The professional title has become fused with the self, making change feel like self-destruction.", x: 0.65, salience: 52,
    emotionalRegister: { primary: "Anxiety", secondary: "Nostalgia", rationale: "Deep unease about who they\u2019ll become, mixed with mourning for who they were." },
    metaphorFamily: { primary: "CAREER IS IDENTITY", examples: ["I don\u2019t know who I am without it", "started from scratch", "lost myself", "reinventing myself", "who am I now?"], rationale: "Self and role have merged. Changing career means changing self \u2014 which triggers existential rather than practical anxiety." },
    reissMotivation: { primary: "Acceptance", secondary: "Status", notes: "The need to be accepted (by self and others) in a new identity competes with the loss of status from the old one." },
    archetype: { primary: "Creator", secondary: "Orphan", notes: "Creator wants to build a new self, but the Orphan grieves the belonging that came with the old identity." },
    culturalStrategy: { orthodoxy: "Your job is what you do, not who you are.", contradiction: "People say this but their language proves the opposite. Professional identity IS personal identity for most mid-career adults.", opportunity: "Don\u2019t tell people their job isn\u2019t their identity. Help them carry their identity into new work." },
    quotes: [
      { text: "For fifteen years I was \u2018Marcus the engineer.\u2019 Now I\u2019m\u2026 just Marcus. And I don\u2019t know what that means.", participant: "P02", market: "UK" },
      { text: "At parties, when someone asks what I do, I still say \u2018I\u2019m in consulting.\u2019 I left consulting eight months ago.", participant: "P10", market: "US" },
      { text: "The hardest part wasn\u2019t the money. It was looking in the mirror and not recognising the person looking back.", participant: "P12", market: "Australia" },
      { text: "I keep my old business cards in a drawer. I don\u2019t know why. It\u2019s like\u2026 proof I was someone.", participant: "P11", market: "UK" },
    ],
    participants: ["P02", "P10", "P11", "P12"],
    linguisticPatterns: ["Existential questions: \u2018who am I?\u2019", "Past tense self-reference", "Mirror/reflection metaphors", "Grief language applied to career"],
    relatedTruths: [1, 6],
  },
  { id: 4, name: "Permission to Want", description: "People struggle to articulate career aspirations without apologising for them. Desire for meaningful work is hedged, qualified, and pre-emptively defended against accusations of privilege or naivety. Wanting more feels culturally dangerous.", x: 0.72, salience: 40,
    emotionalRegister: { primary: "Hope", secondary: "Comfort", rationale: "Genuine aspiration is present but heavily defended by comfort-seeking language that pre-empts judgment." },
    metaphorFamily: { primary: "ASPIRATION IS INDULGENCE", examples: ["I know it sounds privileged", "it\u2019s a luxury to even think about", "first world problem", "I should be grateful", "sounds selfish"], rationale: "Aspiration is framed as excess, not entitlement. People need permission to want more from their careers." },
    reissMotivation: { primary: "Idealism", secondary: "Independence", notes: "The desire for meaningful work (idealism) is suppressed by social pressure to be satisfied with what you have." },
    archetype: { primary: "Innocent", secondary: "Sage", notes: "The Innocent\u2019s belief that something better exists is guarded by the Sage\u2019s rationalisation that contentment is wisdom." },
    culturalStrategy: { orthodoxy: "Be grateful for what you have. Wanting more is ungrateful.", contradiction: "The gratitude mandate silences legitimate aspiration. People aren\u2019t ungrateful \u2014 they\u2019re unfulfilled. These are different things.", opportunity: "Give people language that validates aspiration without triggering guilt. Name the difference between gratitude and fulfilment." },
    quotes: [
      { text: "I know this sounds ridiculous coming from someone with a good salary and a nice house, but\u2026 I want to feel something when I wake up.", participant: "P01", market: "UK" },
      { text: "My friends would kill for my job. And I feel guilty every single day for wanting to leave it.", participant: "P03", market: "Australia" },
      { text: "I\u2019m not looking for passion. That\u2019s a millennial thing. I just want to not dread Monday.", participant: "P04", market: "US" },
      { text: "You\u2019re not allowed to complain about a job that pays well. That\u2019s the rule, isn\u2019t it? Unwritten but absolute.", participant: "P06", market: "Australia" },
    ],
    participants: ["P01", "P03", "P04", "P06", "P09"],
    linguisticPatterns: ["Pre-emptive apology: \u2018I know this sounds\u2019", "Gratitude disclaimers", "Minimising language: \u2018just\u2019, \u2018only\u2019", "Conditional aspiration: \u2018I\u2019d love to, but\u2019"],
    relatedTruths: [1, 5],
  },
  { id: 5, name: "The Money Story", description: "Financial anxiety presented as the primary barrier, but linguistic analysis reveals it often masks deeper fears. Money is the socially acceptable explanation for not changing. The real barriers \u2014 identity, belonging, self-worth \u2014 hide behind the spreadsheet.", x: 0.45, salience: 72,
    emotionalRegister: { primary: "Anxiety", secondary: "Defiance", rationale: "Financial fear is real but also performed. Some participants use money talk defiantly \u2014 as if daring you to challenge their practical objection." },
    metaphorFamily: { primary: "MONEY IS THE WALL", examples: ["can\u2019t afford to", "golden handcuffs", "the numbers don\u2019t work", "financial suicide", "burning through savings"], rationale: "Money as physical barrier. But the wall metaphor hides the fact that many participants could afford to change \u2014 they just can\u2019t afford to fail." },
    reissMotivation: { primary: "Saving", secondary: "Order", notes: "The desire for financial security and order provides a rational framework for what is actually an emotional decision." },
    archetype: { primary: "Ruler", secondary: "Caregiver", notes: "Ruler needs control over resources; Caregiver frames financial caution as responsibility to dependants." },
    culturalStrategy: { orthodoxy: "Career change is primarily a financial decision. You need a financial runway.", contradiction: "Most participants who cited money as the barrier had more runway than they needed. The money story protects them from confronting harder truths.", opportunity: "Don\u2019t solve the money problem. Surface the truth beneath it. Help people see what money is really protecting them from." },
    quotes: [
      { text: "I\u2019ve done the spreadsheet seventeen times. The numbers always work. I still can\u2019t do it.", participant: "P09", market: "UK" },
      { text: "Everyone assumes I can\u2019t afford to leave. I can. I just\u2026 what if I\u2019m not good at anything else?", participant: "P07", market: "US" },
      { text: "The mortgage is the reason I give people. The real reason is I\u2019m terrified of being ordinary.", participant: "P01", market: "UK" },
      { text: "My partner said \u2018we have enough savings.\u2019 And I immediately found another reason not to leave.", participant: "P03", market: "Australia" },
    ],
    participants: ["P01", "P03", "P07", "P09", "P11"],
    linguisticPatterns: ["Spreadsheet/calculation language", "Responsibility framing: \u2018I have a family\u2019", "Deflection: money cited first, deeper fear follows", "Quantification of unquantifiable fears"],
    relatedTruths: [1, 2],
  },
  { id: 6, name: "The Quiet Becoming", description: "A counter-narrative emerging in people who\u2019ve made the change. They describe not a dramatic leap but a slow, quiet process of becoming someone new. The language is organic \u2014 growing, unfolding, emerging \u2014 not mechanical or heroic.", x: 0.82, salience: 25,
    emotionalRegister: { primary: "Pride", secondary: "Hope", rationale: "Quiet confidence rather than triumphalism. These participants don\u2019t perform success \u2014 they describe a settling into something true." },
    metaphorFamily: { primary: "CHANGE IS GROWTH", examples: ["slowly becoming", "growing into", "finding my way", "unfolding", "it happened gradually", "planting seeds"], rationale: "Organic, botanical metaphors replace the mechanical/gravitational metaphors of pre-change discourse. Change as natural process, not engineering project." },
    reissMotivation: { primary: "Tranquility", secondary: "Curiosity", notes: "Post-change, the dominant desire shifts from independence to peace \u2014 and a gentle curiosity about what comes next." },
    archetype: { primary: "Sage", secondary: "Creator", notes: "The Sage\u2019s wisdom about patience and process, combined with the Creator\u2019s quiet joy in building something new." },
    culturalStrategy: { orthodoxy: "Career change is a bold, decisive act. You leap and then you land.", contradiction: "The people who\u2019ve actually done it describe something gentler. Not a leap but a drift. Not a reinvention but a remembering.", opportunity: "Tell the quiet story. The becoming, not the leaping. This is the truth that gives pre-changers permission to start small." },
    quotes: [
      { text: "It wasn\u2019t a leap. It was more like\u2026 I just started walking in a different direction. And one day I looked up and I was somewhere new.", participant: "P05", market: "UK" },
      { text: "People ask \u2018when did you decide?\u2019 But there wasn\u2019t a moment. It was a thousand tiny moments.", participant: "P08", market: "Australia" },
      { text: "I didn\u2019t reinvent myself. I remembered myself. The person I was before the career got in the way.", participant: "P10", market: "US" },
      { text: "The biggest change was internal. Externally, my life looks almost the same. But I feel like a completely different person.", participant: "P12", market: "Australia" },
    ],
    participants: ["P05", "P08", "P10", "P12"],
    linguisticPatterns: ["Organic/growth metaphors", "Passive discovery: \u2018I found\u2019 vs. \u2018I made\u2019", "Temporal vagueness: \u2018gradually\u2019, \u2018slowly\u2019", "Remembering language vs. creating language"],
    relatedTruths: [3, 4],
  },
];

const SAMPLE_AXES = [
  { id: "aspiration-barrier", name: "Aspiration \u2194 Barrier", topLabel: "Aspiration", bottomLabel: "Barrier",
    rationale: "The foundational lens for human truth work: what people want versus what holds them back. Reveals where the deepest strategic opportunities sit.",
    quadrants: {
      topLeft: { label: "Spoken Dreams", tagline: "Aspirations people can name" },
      topRight: { label: "Hidden Yearnings", tagline: "Aspirations revealed through language" },
      bottomLeft: { label: "Known Obstacles", tagline: "Barriers people articulate clearly" },
      bottomRight: { label: "Invisible Walls", tagline: "Barriers hiding in language patterns" },
    },
    yPositions: { "1": 0.62, "2": 0.7, "3": 0.55, "4": 0.18, "5": 0.78, "6": 0.15 },
    narrative: {
      headline: "People can name what holds them back \u2014 but not what they\u2019re reaching for",
      summary: "The most striking asymmetry in this corpus is between barrier fluency and aspiration silence. Participants can describe what\u2019s wrong in granular, articulate detail: the money, the risk, the identity loss, the judgment. They have language for pain.\n\nBut ask what they want \u2014 what they\u2019re moving toward \u2014 and the language thins. Hedging. Qualification. Apology. The aspiration is present but defended, as if wanting something better is itself a vulnerability.\n\nThis creates a profound insight for anyone building products or services in this space: the barrier story is loud and well-rehearsed. The aspiration story is quiet and needs permission. The brands and platforms that succeed won\u2019t be the ones that solve barriers \u2014 they\u2019ll be the ones that give people language for what they want.\n\nThe Quiet Becoming truth is the most strategically valuable finding here. It suggests that the dominant cultural narrative of career change (the bold leap, the dramatic reinvention) is actually misaligned with how change actually happens. The real story is gentler, slower, and more organic. But it has no cultural megaphone.",
      keyTension: "How might we give people permission to articulate aspiration without triggering the guilt and apology that currently surrounds it?",
    },
  },
  { id: "comfort-anxiety", name: "Comfort \u2194 Anxiety", topLabel: "Comfort", bottomLabel: "Anxiety",
    rationale: "The emotional temperature of each truth. Reveals which truths carry threat and which carry reassurance \u2014 and where the two coexist in tension.",
    quadrants: {
      topLeft: { label: "Familiar Safety", tagline: "Comfortable, well-articulated positions" },
      topRight: { label: "Quiet Relief", tagline: "Comfort found through unarticulated processes" },
      bottomLeft: { label: "Named Fears", tagline: "Anxieties people can describe clearly" },
      bottomRight: { label: "Unnamed Dread", tagline: "Anxieties hiding beneath the surface" },
    },
    yPositions: { "1": 0.35, "2": 0.72, "3": 0.82, "4": 0.6, "5": 0.55, "6": 0.12 },
    narrative: {
      headline: "The comfortable career is the anxious one \u2014 and the anxious transition leads to comfort",
      summary: "A counterintuitive finding: the participants who stayed in stable careers described more anxiety symptoms than those who had changed. The Golden Cage truth sits firmly in the anxiety zone even though participants frame it as comfortable. The language betrays them \u2014 chest tightness, Sunday dread, suffocation.\n\nMeanwhile, The Quiet Becoming \u2014 participants who\u2019ve navigated change \u2014 radiates genuine comfort. Not the performed comfort of \u2018I should be grateful\u2019 but the embodied comfort of alignment. Their language is slower, more grounded, less defended.\n\nThis inversion matters strategically. The category assumption is that career change creates anxiety and career stability provides comfort. The linguistic evidence suggests the opposite: stability can generate chronic low-grade anxiety, while change (when navigated, not leaped into) produces genuine peace.\n\nThe implication: stop positioning career services as anxiety reducers. Position them as comfort providers \u2014 where comfort means alignment, not safety.",
      keyTension: "Is the goal to reduce the anxiety of change \u2014 or to name the anxiety of staying?",
    },
  },
  { id: "individual-social", name: "Individual \u2194 Social", topLabel: "Individual", bottomLabel: "Social",
    rationale: "Whether each truth is experienced as a personal journey or a social negotiation. Reveals the hidden influence of others on what feels like a private decision.",
    quadrants: {
      topLeft: { label: "Personal Clarity", tagline: "Individual truths people can name" },
      topRight: { label: "Inner Whispers", tagline: "Individual truths revealed through language" },
      bottomLeft: { label: "Social Scripts", tagline: "Social pressures people acknowledge" },
      bottomRight: { label: "Invisible Audiences", tagline: "Social pressures hiding in language" },
    },
    yPositions: { "1": 0.5, "2": 0.3, "3": 0.7, "4": 0.82, "5": 0.55, "6": 0.2 },
    narrative: {
      headline: "Career change feels private but the language reveals an invisible audience in every room",
      summary: "Participants overwhelmingly describe career change as a personal decision. \u2018It\u2019s about me.\u2019 \u2018I need to find myself.\u2019 The individual framing is explicit and rehearsed.\n\nBut the linguistic evidence tells a different story. Nearly every truth in this corpus contains social reference points: partners, parents, colleagues, friends, \u2018people.\u2019 Permission to Want is entirely structured around social judgment. The Money Story is often a proxy for \u2018what will people think if I fail?\u2019\n\nEven The Quiet Becoming \u2014 the most individually-framed truth \u2014 contains social markers. \u2018People ask when did you decide.\u2019 The audience is always present, even in the quietest moments.\n\nThis has significant implications for how career services communicate. Speaking to the individual journey is necessary but insufficient. The hidden social dimension \u2014 the invisible audiences of judgment, expectation, and comparison \u2014 must be addressed, even when it\u2019s not named.",
      keyTension: "How do you support a social transition that people experience as personal?",
    },
  },
];

const SAMPLE_TENSIONS = [
  { id: 1, rank: 1, forceA: "Cage Comfort", forceB: "Leap Terror",
    summary: "The Golden Cage is painful but familiar. The Leap of Faith is exciting but terrifying. People oscillate between these poles indefinitely \u2014 the oscillation itself becomes the experience.",
    evidence: [
      { text: "I earn well. I have a title people respect. And every Sunday night I feel this weight in my chest.", source: "Sarah (P01)", truthId: 1 },
      { text: "Everyone talks about taking the leap. But nobody talks about what happens when you\u2019re mid-air.", source: "Aisha (P05)", truthId: 2 },
      { text: "I\u2019ve been standing on the edge for two years. Just\u2026 standing there.", source: "Elena (P07)", truthId: 2 },
    ],
    significance: "This tension keeps people frozen. The binary framing (stay safe or risk everything) prevents the gradual, organic transition that The Quiet Becoming participants describe. The tension isn\u2019t resolved through courage \u2014 it\u2019s dissolved through reframing.",
    categoryRelevance: "Directly relevant to Workday\u2019s positioning. If career change feels binary, platforms that offer incremental steps (micro-transitions, skill exploration, identity work) dissolve the tension rather than demand a resolution.",
    strategicQuestion: "How might we reframe career change from a leap to a walk \u2014 so people can start moving without needing to decide to jump?",
  },
  { id: 2, rank: 2, forceA: "Money as Barrier", forceB: "Identity as Barrier",
    summary: "Money is the articulated barrier. Identity is the unarticulated one. The Money Story provides a socially acceptable explanation that protects people from confronting the harder truth: they don\u2019t know who they\u2019ll be.",
    evidence: [
      { text: "I\u2019ve done the spreadsheet seventeen times. The numbers always work. I still can\u2019t do it.", source: "Rachel (P09)", truthId: 5 },
      { text: "For fifteen years I was \u2018Marcus the engineer.\u2019 Now I\u2019m\u2026 just Marcus.", source: "Marcus (P02)", truthId: 3 },
      { text: "The mortgage is the reason I give people. The real reason is I\u2019m terrified of being ordinary.", source: "Sarah (P01)", truthId: 5 },
    ],
    significance: "This tension reveals why practical career support (financial planning, skills training) often fails. It addresses the articulated barrier but misses the unarticulated one. People don\u2019t need better spreadsheets \u2014 they need better mirrors.",
    categoryRelevance: "Critical for product design. Tools that only address practical barriers (salary calculators, job matching) miss the emotional core. The opportunity is in identity work disguised as practical support.",
    strategicQuestion: "What would career support look like if it treated identity as the primary barrier and money as the presenting symptom?",
  },
  { id: 3, rank: 3, forceA: "Aspiration Guilt", forceB: "Aspiration Permission",
    summary: "Wanting more from your career feels culturally dangerous. People hedge, apologise, and qualify their desires. The Quiet Becoming participants don\u2019t \u2014 they\u2019ve found permission through action, not through resolving the guilt.",
    evidence: [
      { text: "I know this sounds ridiculous coming from someone with a good salary and a nice house, but\u2026", source: "Sarah (P01)", truthId: 4 },
      { text: "I didn\u2019t reinvent myself. I remembered myself.", source: "Chris (P10)", truthId: 6 },
      { text: "You\u2019re not allowed to complain about a job that pays well. That\u2019s the rule, isn\u2019t it?", source: "Tom (P06)", truthId: 4 },
    ],
    significance: "The gratitude mandate is a powerful social mechanism that suppresses aspiration. It\u2019s particularly strong in participants with families, where wanting more feels like rejecting what you have.",
    categoryRelevance: "Tone-critical for Workday communications. Any messaging that triggers the gratitude response (\u2018unlock your potential\u2019, \u2018reach for more\u2019) risks activating guilt rather than aspiration. The language needs to be gentler.",
    strategicQuestion: "How do you validate aspiration without triggering the cultural guilt that surrounds wanting more?",
  },
  { id: 4, rank: 4, forceA: "Bold Reinvention Narrative", forceB: "Quiet Becoming Reality",
    summary: "Culture tells a story of dramatic career reinvention \u2014 the bold leap, the dramatic pivot. But the people who\u2019ve actually changed describe something gentler. The dominant narrative is aspirational fiction; the reality is quieter and more organic.",
    evidence: [
      { text: "It wasn\u2019t a leap. It was more like\u2026 I just started walking in a different direction.", source: "Aisha (P05)", truthId: 6 },
      { text: "When I finally jumped, the worst part wasn\u2019t the fall. It was the three seconds of silence.", source: "David (P08)", truthId: 2 },
      { text: "People ask \u2018when did you decide?\u2019 But there wasn\u2019t a moment.", source: "David (P08)", truthId: 6 },
    ],
    significance: "The cultural narrative of bold reinvention may actually be preventing change. If the only story available is the dramatic leap, people who want gradual transition have no model to follow.",
    categoryRelevance: "Narrative strategy for Workday. The opportunity is to tell the quiet story \u2014 the becoming, not the leaping \u2014 and give it cultural visibility. This is the under-told truth with the most strategic potential.",
    strategicQuestion: "What if the most powerful career change story isn\u2019t the dramatic leap \u2014 but the quiet walk?",
  },
];

const SAMPLE_PROVOCATIONS = [
  { id: 1, tensionId: 1, title: "What if the cage is more frightening than the leap?", text: "Participants describe their stable careers with more anxiety language than participants who\u2019ve changed. If staying generates more fear than going, perhaps the risk calculation is inverted \u2014 and career services should help people see the cost of not changing.", evidence: "Golden Cage emotional register (frustration/resignation) vs. Quiet Becoming (pride/hope). Anxiety language is 3x more frequent in pre-change participants." },
  { id: 2, tensionId: 2, title: "What would a career platform look like if it started with \u2018who are you?\u2019 instead of \u2018what do you do?\u2019", text: "If identity is the real barrier, career support should begin with identity work. Not personality tests or skills assessments, but genuinely helping people separate who they are from what they do \u2014 before asking what they want to do next.", evidence: "The Identity Audit truth \u2014 participants describe career-self fusion as the deepest source of paralysis." },
  { id: 3, tensionId: 3, title: "What if we stopped asking people what they want and started asking what they\u2019d allow themselves to want?", text: "The permission barrier is real and linguistically measurable. People have aspirations but pre-emptively censor them. A platform that creates safety for aspiration \u2014 normalising desire, removing guilt \u2014 could unlock behaviour that no amount of practical support can.", evidence: "Permission to Want truth \u2014 every participant hedged or apologised when describing aspiration." },
  { id: 4, tensionId: 4, title: "What if the best career change content showed the boring middle, not the dramatic before-and-after?", text: "Every career change story in media is a leap narrative. Dramatic tension, climactic decision, triumphant landing. But The Quiet Becoming suggests the real story is undramatic, gradual, and iterative. Showing this truth might do more for behaviour change than any inspirational content.", evidence: "Quiet Becoming participants \u2014 organic/growth metaphors vs. gravity/leap metaphors in pre-change participants." },
];

/* ─── API Prompts ─── */
const HUMAN_TRUTH_VOICE = `NARRATIVE VOICE: Write for a progressive, ambitious strategist who wants human truth insight that challenges their assumptions. Be sharp, evocative, and clear. Avoid academic language and jargon. Every sentence should make a busy reader lean in.

TONE RULES:
- NEVER use "it's not X, it's Y" constructions
- NEVER use dramatic absolutes
- Write in natural paragraphs, not taxonomies
- End with a genuine strategic question

HUMAN TRUTH LENS: Read through the aspiration/barrier framework:
1. ASPIRATION: What people want, hope for, strive toward
2. BARRIER: What holds them back — social judgment, practical constraints, psychological friction
3. LINGUISTIC EVIDENCE: How their language reveals truths they can't or won't articulate
Focus on the gap between what people say and what their language reveals.`;

function buildAxisPrompt(truths, meta, userAngle) {
  const ns = truths.map(n => `- ${n.name} (id:${n.id}, salience:${n.salience}%, x:${n.x}): ${n.description}`).join("\n");
  return `You are a human truth analyst for d+m. You have ${truths.length} truths from the territory "${meta.territory}" for ${meta.client}.

THE NARRATIVES:
${ns}

THE STRATEGIST WANTS TO EXPLORE THIS ANGLE:
"${userAngle}"

Generate exactly ONE new y-axis for a 2\u00D72 strategic map.
The x-axis is always Articulated (0) \u2192 Unarticulated (1).

${HUMAN_TRUTH_VOICE}

Return ONLY a JSON object (no markdown, no fences):
{
  "id": "kebab-case-id",
  "name": "Top Pole \u2194 Bottom Pole",
  "topLabel": "Top Pole Name",
  "bottomLabel": "Bottom Pole Name",
  "rationale": "1-2 sentences",
  "quadrants": {
    "topLeft": { "label": "Name", "tagline": "Short descriptor" },
    "topRight": { "label": "Name", "tagline": "Short descriptor" },
    "bottomLeft": { "label": "Name", "tagline": "Short descriptor" },
    "bottomRight": { "label": "Name", "tagline": "Short descriptor" }
  },
  "yPositions": { ${truths.map(n => `"${n.id}": 0.5`).join(", ")} },
  "narrative": {
    "headline": "One-line strategic headline",
    "summary": "3-5 paragraphs separated by \\n\\n",
    "keyTension": "Central strategic question"
  }
}

Position each truth on the y-axis (0=top, 1=bottom). Be precise.`;
}

function buildProvocationPrompt(tensions, truths, meta, userPrompt) {
  const ts = tensions.map(t => `T${t.rank}: ${t.forceA} \u2194 ${t.forceB} \u2014 ${t.summary}`).join("\n");
  return `You are a human truth analyst for d+m. Generate an interview provocation for ${meta.client}'s "${meta.territory}" territory.

TENSIONS:
${ts}

THE STRATEGIST ASKS:
"${userPrompt}"

${HUMAN_TRUTH_VOICE}

Return ONLY a JSON object (no markdown, no fences):
{
  "tensionId": <id of most relevant tension>,
  "title": "A single-sentence question that would provoke discussion in fieldwork",
  "text": "2-3 sentences expanding the provocation",
  "evidence": "Brief citation grounding it in the analysis"
}

The title MUST be a single-sentence question. Not a two-part tension format.`;
}

function buildRefinePrompt(currentAxis, truths, meta, userPrompt) {
  const ns = truths.map(n => `- ${n.name} (salience:${n.salience}%): ${n.description}`).join("\n");
  return `You are a human truth analyst for d+m. Rewrite the strategic narrative for ${meta.client}'s "${meta.territory}" territory through the lens "${currentAxis.name}".

CURRENT NARRATIVE:
Headline: ${currentAxis.narrative.headline}
Summary: ${currentAxis.narrative.summary}
Key tension: ${currentAxis.narrative.keyTension}

NARRATIVES:
${ns}

THE STRATEGIST ASKS:
"${userPrompt}"

${HUMAN_TRUTH_VOICE}

Return ONLY a JSON object (no markdown, no fences):
{
  "headline": "...",
  "summary": "3-5 paragraphs separated by \\n\\n",
  "keyTension": "..."
}`;
}

/* ─── Process step accordion item (used on onboarding screen) ─── */
function ProcessStepItem({ num, label, headline, detail, time }) {
  const [open, setOpen] = useState(false);
  const linkStyle = { color: DM.black, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: "2px" };
  const detailContent = detail === "link" ? (
    <p style={{ fontSize: "11px", fontWeight: 300, color: DM.grey600, lineHeight: 1.7, margin: 0 }}>
      Start at the <a href={CLAUDE_PROJECT_URL} target="_blank" rel="noopener noreferrer" style={linkStyle}>Claude Project</a>. Drop your research brief into a new conversation with interview transcripts. Claude will analyse the language, map aspiration and barrier patterns, and build the analytical framework.
    </p>
  ) : detail === "gen" ? (
    <p style={{ fontSize: "11px", fontWeight: 300, color: DM.grey600, lineHeight: 1.7, margin: 0 }}>
      Feed cleaned interview transcripts into the <a href={CLAUDE_PROJECT_URL} target="_blank" rel="noopener noreferrer" style={linkStyle}>Claude Project</a> conversation. Claude analyses the corpus, maps narratives onto the 2{"\u00D7"}2, and outputs the Explorer JSON.
    </p>
  ) : (
    <p style={{ fontSize: "11px", fontWeight: 300, color: DM.grey600, lineHeight: 1.7, margin: 0 }}>{detail}</p>
  );
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", padding: "12px 14px", border: "none", background: open ? "#FFFCEB" : DM.white, cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", textAlign: "left", transition: "background 0.15s" }}
      >
        <span style={{ fontFamily: "'Anton', sans-serif", fontSize: "18px", color: DM.yellow, minWidth: "28px" }}>{num}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "13px", fontWeight: 600, color: DM.black }}>{label}</span>
            <span style={{ fontSize: "10px", fontWeight: 300, color: DM.grey400 }}>{time}</span>
          </div>
          <div style={{ fontSize: "11px", fontWeight: 300, color: DM.grey600, marginTop: "2px" }}>{headline}</div>
        </div>
        <span style={{ fontSize: "12px", color: DM.grey400, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>{"\u25BE"}</span>
      </button>
      {open && (
        <div style={{ padding: "0 14px 14px 54px", background: "#FFFCEB" }}>
          {detailContent}
        </div>
      )}
    </div>
  );
}

const CLAUDE_PROJECT_URL = "https://claude.ai/project/human-truth-explorer";
const projectLink = (text) => ({ __isLink: true, text, url: CLAUDE_PROJECT_URL });

/* ─── IndexedDB helpers ─── */
const IDB_NAME = "HumanTruthExplorer";
const IDB_VERSION = 1;
const IDB_STORE = "sessions";

function idbOpen() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, IDB_VERSION);
    req.onupgradeneeded = e => e.target.result.createObjectStore(IDB_STORE, { keyPath: "projectKey" });
    req.onsuccess = e => resolve(e.target.result);
    req.onerror = e => reject(e.target.error);
  });
}
async function idbGet(projectKey) {
  const db = await idbOpen();
  return new Promise((resolve, reject) => {
    const req = db.transaction(IDB_STORE, "readonly").objectStore(IDB_STORE).get(projectKey);
    req.onsuccess = e => resolve(e.target.result || null);
    req.onerror = e => reject(e.target.error);
  });
}
async function idbPut(data) {
  const db = await idbOpen();
  return new Promise((resolve, reject) => {
    const req = db.transaction(IDB_STORE, "readwrite").objectStore(IDB_STORE).put(data);
    req.onsuccess = e => resolve(e.target.result);
    req.onerror = e => reject(e.target.error);
  });
}

const PROCESS_STEPS = [
  { num: "01", label: "Brief", headline: "Define the research question and interview framework",
    detail: "link",
    time: "30\u201360 min" },
  { num: "02", label: "Analyse", headline: "Feed interview transcripts to Claude, produce the Explorer JSON",
    detail: "gen",
    time: "2\u20134 hrs" },
  { num: "03", label: "Explore", headline: "Upload your JSON and explore the human truth landscape",
    detail: "Upload the Explorer JSON above to see your truths positioned on the interactive 2\u00D72 map. Choose from multiple strategic lenses, explore ranked tensions and provocations, drag truths to reposition them, edit any text inline, and generate new y-axis lenses with AI. The Explorer is both an analytical working surface and a presentation tool \u2014 use it to walk clients through what people are really telling us.",
    time: "Ongoing" },
];

/* ════════════════════════════════════════════════════ */
function HumanTruthExplorer() {
  const [phase, setPhase] = useState("onboarding");
  const [activeView, setActiveView] = useState("map");

  const [meta, setMeta] = useState(null);
  const [allTruths, setAllTruths] = useState([]);
  const [allAxes, setAllAxes] = useState([]);
  const [allTensions, setAllTensions] = useState([]);
  const [allProvocations, setAllProvocations] = useState([]);
  const [allParticipants, setAllParticipants] = useState([]);
  const [isDemo, setIsDemo] = useState(false);

  const [selectedAxisId, setSelectedAxisId] = useState(null);
  const [selectedTruth, setSelectedTruth] = useState(null);
  const [truths, setTruths] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [hoveredTruth, setHoveredTruth] = useState(null);
  const [selectedQuadrant, setSelectedQuadrant] = useState(null);
  const [uploadError, setUploadError] = useState("");

  const [newAngle, setNewAngle] = useState("");
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState("");

  const [editingField, setEditingField] = useState(null);
  const [refinePrompt, setRefinePrompt] = useState("");
  const [refining, setRefining] = useState(false);
  const [refineError, setRefineError] = useState("");

  const [provPrompt, setProvPrompt] = useState("");
  const [provGenerating, setProvGenerating] = useState(false);
  const [provError, setProvError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingKey, setEditingKey] = useState(null);
  const [dragItemType, setDragItemType] = useState(null);
  const [dragIdx, setDragIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const [showGaps, setShowGaps] = useState(false);
  const [expandedTension, setExpandedTension] = useState(null);
  const [notes, setNotes] = useState([]);
  const [quickNoteOpen, setQuickNoteOpen] = useState(false);
  const [quickNoteText, setQuickNoteText] = useState("");
  const [activeSegment, setActiveSegment] = useState(null);
  const [userInitials, setUserInitials] = useState("");
  const [initialsInput, setInitialsInput] = useState("");
  const [showInitialsPrompt, setShowInitialsPrompt] = useState(false);
  const [importError, setImportError] = useState("");
  const [saveStatus, setSaveStatus] = useState(""); // "saved" | "saving" | ""

  const mapRef = useRef(null);
  const fileRef = useRef(null);
  const importFileRef = useRef(null);

  const currentAxis = useMemo(() => allAxes.find(a => a.id === selectedAxisId) || null, [allAxes, selectedAxisId]);
  const getQ = (x, y) => { if (x < 0.5 && y < 0.5) return "topLeft"; if (x >= 0.5 && y < 0.5) return "topRight"; if (x < 0.5 && y >= 0.5) return "bottomLeft"; return "bottomRight"; };
  const qMeta = useCallback((key) => currentAxis?.quadrants?.[key] || { label: "", tagline: "" }, [currentAxis]);
  const allSegments = useMemo(() => [...new Set(allParticipants.map(p => p.segment).filter(Boolean))], [allParticipants]);
  const activeSalience = useCallback((n) => {
    if (activeSegment && n.salienceBySegment && n.salienceBySegment[activeSegment] != null) return n.salienceBySegment[activeSegment];
    return n.salience;
  }, [activeSegment]);
  const addNote = useCallback((text, linkedTruthId = null) => {
    if (!text.trim()) return;
    setNotes(prev => [{
      id: Date.now(),
      text: text.trim(),
      linkedTruthId,
      linkedTruthName: linkedTruthId ? allTruths.find(t => t.id === linkedTruthId)?.name : null,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      axis: currentAxis?.name || null,
      author: userInitials || "?",
    }, ...prev]);
  }, [allTruths, currentAxis, userInitials]);

  const deleteNote = useCallback((id) => setNotes(prev => prev.filter(n => n.id !== id)), []);

  // Derive project key from meta
  const projectKey = useMemo(() => meta ? `${meta.client || ""}::${meta.territory || ""}` : null, [meta]);

  // Load saved session from IndexedDB when project loads
  const loadData = useCallback(async (data, demo = false) => {
    const baseMeta = data.meta || SAMPLE_META;
    const pk = `${baseMeta.client || ""}::${baseMeta.territory || ""}`;
    setMeta(baseMeta);
    setAllTruths(data.truths || data.narratives || SAMPLE_TRUTHS);
    setAllAxes(data.axes || SAMPLE_AXES);
    setAllTensions(data.tensions || SAMPLE_TENSIONS);
    setAllProvocations(data.provocations || SAMPLE_PROVOCATIONS);
    setAllParticipants(data.participants || data.sources || SAMPLE_PARTICIPANTS);
    setIsDemo(demo);
    setSelectedAxisId(null);
    setSelectedTruth(null);
    setPhase("frame");
    if (!demo) {
      try {
        const saved = await idbGet(pk);
        if (saved) {
          if (saved.notes?.length) setNotes(saved.notes);
          if (saved.customAxes?.length) setAllAxes(prev => {
            const existingIds = new Set(prev.map(a => a.id));
            return [...prev, ...saved.customAxes.filter(a => !existingIds.has(a.id))];
          });
          if (saved.customProvocations?.length) setAllProvocations(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            return [...prev, ...saved.customProvocations.filter(p => !existingIds.has(p.id))];
          });
          if (saved.userInitials) { setUserInitials(saved.userInitials); setInitialsInput(saved.userInitials); }
          else setShowInitialsPrompt(true);
        } else {
          setShowInitialsPrompt(true);
        }
      } catch (e) { setShowInitialsPrompt(true); }
    }
  }, []);

  // Auto-save to IndexedDB when notes/axes/provocations change
  useEffect(() => {
    if (!projectKey || isDemo || phase === "onboarding" || phase === "frame") return;
    const customAxes = allAxes.filter(a => a._custom);
    const customProvocations = allProvocations.filter(p => p._generated);
    setSaveStatus("saving");
    idbPut({ projectKey, notes, customAxes, customProvocations, userInitials })
      .then(() => { setSaveStatus("saved"); setTimeout(() => setSaveStatus(""), 1800); })
      .catch(() => setSaveStatus(""));
  }, [notes, allAxes, allProvocations, userInitials, projectKey, isDemo, phase]);

  // Export annotations as JSON
  const exportAnnotations = useCallback(() => {
    if (!meta) return;
    const payload = {
      _type: "HumanTruthAnnotations",
      version: 1,
      projectKey,
      territory: meta.territory,
      client: meta.client,
      exportedAt: new Date().toISOString(),
      notes,
      customAxes: allAxes.filter(a => a._custom),
      customProvocations: allProvocations.filter(p => p._generated),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(meta.territory || "annotations").replace(/\s+/g, "_")}_annotations.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [meta, projectKey, notes, allAxes, allProvocations]);

  // Import shared annotations JSON
  const handleImportAnnotations = useCallback((e) => {
    const file = e.target.files?.[0]; if (!file) return;
    setImportError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data._type !== "HumanTruthAnnotations") throw new Error("Not a valid annotations file.");
        let mergedNotes = 0, mergedAxes = 0, mergedProvs = 0;
        if (data.notes?.length) {
          setNotes(prev => {
            const existingIds = new Set(prev.map(n => n.id));
            const incoming = data.notes.filter(n => !existingIds.has(n.id));
            mergedNotes = incoming.length;
            return [...incoming, ...prev].sort((a, b) => b.id - a.id);
          });
        }
        if (data.customAxes?.length) {
          setAllAxes(prev => {
            const existingIds = new Set(prev.map(a => a.id));
            const incoming = data.customAxes.filter(a => !existingIds.has(a.id));
            mergedAxes = incoming.length;
            return [...prev, ...incoming];
          });
        }
        if (data.customProvocations?.length) {
          setAllProvocations(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const incoming = data.customProvocations.filter(p => !existingIds.has(p.id));
            mergedProvs = incoming.length;
            return [...prev, ...incoming];
          });
        }
        setImportError(`Imported: ${mergedNotes} note${mergedNotes !== 1 ? "s" : ""}, ${mergedAxes} axis${mergedAxes !== 1 ? "es" : ""}, ${mergedProvs} provocation${mergedProvs !== 1 ? "s" : ""}.`);
      } catch (err) { setImportError("Import failed: " + err.message); }
      if (importFileRef.current) importFileRef.current.value = "";
    };
    reader.readAsText(file);
  }, []);

  const confirmInitials = useCallback(() => {
    const val = initialsInput.trim().toUpperCase().slice(0, 4) || "?";
    setUserInitials(val);
    setShowInitialsPrompt(false);
  }, [initialsInput]);

  const loadDemo = useCallback(() => loadData({}, true), [loadData]);

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploadError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (!(data.truths || data.narratives) || !data.axes) { setUploadError("Invalid file: missing truths/narratives or axes."); return; }
        loadData(data, false);
      } catch (err) { setUploadError("Failed to parse JSON: " + err.message); }
    };
    reader.readAsText(file);
  }, [loadData]);

  const resetAll = useCallback(() => {
    setPhase("onboarding"); setMeta(null); setAllTruths([]); setAllAxes([]); setAllTensions([]);
    setAllProvocations([]); setAllParticipants([]); setIsDemo(false); setSelectedAxisId(null);
    setSelectedTruth(null); setTruths([]); setActiveView("map"); setNotes([]); setActiveSegment(null);
    if (fileRef.current) fileRef.current.value = "";
  }, []);

  const applyAxis = useCallback((id) => {
    const ax = allAxes.find(a => a.id === id); if (!ax) return;
    setSelectedAxisId(id);
    setTruths(allTruths.map(n => ({ ...n, y: ax.yPositions[n.id] ?? 0.5 })));
    setSelectedTruth(null); setPhase("explorer"); setActiveView("map");
  }, [allAxes, allTruths]);

  // Generate axis
  const generateAxis = useCallback(async () => {
    if (!newAngle.trim() || generating) return;
    setGenerating(true); setGenError("");
    try {
      const prompt = buildAxisPrompt(allTruths, meta, newAngle.trim());
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 2000, messages: [{ role: "user", content: prompt }] }),
      });
      const result = await res.json();
      const text = result.content?.map(b => b.text || "").join("") || "";
      const axis = JSON.parse(text.replace(/```json|```/g, "").trim());
      if (!axis.id || !axis.yPositions || !axis.quadrants || !axis.narrative) throw new Error("Missing required fields");
      axis._custom = true;
      setAllAxes(prev => [...prev, axis]);
      setNewAngle("");
    } catch (err) { setGenError("Failed: " + err.message); }
    setGenerating(false);
  }, [newAngle, generating, allTruths, meta]);

  // Generate provocation
  const generateProvocation = useCallback(async () => {
    if (!provPrompt.trim() || provGenerating) return;
    setProvGenerating(true); setProvError("");
    try {
      const prompt = buildProvocationPrompt(allTensions, allTruths, meta, provPrompt.trim());
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
      });
      const result = await res.json();
      const text = result.content?.map(b => b.text || "").join("") || "";
      const prov = JSON.parse(text.replace(/```json|```/g, "").trim());
      prov.id = Math.max(0, ...allProvocations.map(p => p.id)) + 1;
      prov._generated = true;
      setAllProvocations(prev => [...prev, prov]);
      setProvPrompt("");
    } catch (err) { setProvError("Failed: " + err.message); }
    setProvGenerating(false);
  }, [provPrompt, provGenerating, allTensions, allTruths, meta, allProvocations]);

  // Refine narrative
  const refineNarrative = useCallback(async () => {
    if (!refinePrompt.trim() || refining || !currentAxis) return;
    setRefining(true); setRefineError("");
    try {
      const prompt = buildRefinePrompt(currentAxis, allTruths, meta, refinePrompt.trim());
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 2000, messages: [{ role: "user", content: prompt }] }),
      });
      const result = await res.json();
      const text = result.content?.map(b => b.text || "").join("") || "";
      const newNarr = JSON.parse(text.replace(/```json|```/g, "").trim());
      if (newNarr.headline && newNarr.summary && newNarr.keyTension) {
        setAllAxes(prev => prev.map(ax => ax.id === selectedAxisId ? { ...ax, narrative: { ...ax.narrative, ...newNarr } } : ax));
        setRefinePrompt("");
      } else throw new Error("Missing fields");
    } catch (err) { setRefineError("Failed: " + err.message); }
    setRefining(false);
  }, [refinePrompt, refining, currentAxis, selectedAxisId, allTruths, meta]);

  const updateNarrative = useCallback((field, value) => {
    setAllAxes(prev => prev.map(ax => ax.id === selectedAxisId ? { ...ax, narrative: { ...ax.narrative, [field]: value } } : ax));
  }, [selectedAxisId]);

  // Map drag
  const handleMouseDown = useCallback((e, n) => { e.stopPropagation(); e.preventDefault(); setDragging(n.id); setSelectedTruth(n); }, []);
  const handleMouseMove = useCallback((e) => {
    if (!dragging || !mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = Math.max(0.04, Math.min(0.96, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0.06, Math.min(0.94, (e.clientY - rect.top) / rect.height));
    setTruths(p => p.map(n => n.id === dragging ? { ...n, x, y } : n));
    setSelectedTruth(p => p && p.id === dragging ? { ...p, x, y } : p);
  }, [dragging]);
  const handleMouseUp = useCallback(() => setDragging(null), []);
  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => { window.removeEventListener("mousemove", handleMouseMove); window.removeEventListener("mouseup", handleMouseUp); };
    }
  }, [dragging, handleMouseMove, handleMouseUp]);

  // List drag reorder
  const handleDragStart = useCallback((type, idx) => { setDragItemType(type); setDragIdx(idx); }, []);
  const handleDragOver = useCallback((e, idx) => { e.preventDefault(); setDragOverIdx(idx); }, []);
  const handleDrop = useCallback((type, idx) => {
    if (dragItemType !== type || dragIdx === null) return;
    const setter = type === "tension" ? setAllTensions : setAllProvocations;
    setter(prev => {
      const items = [...prev];
      const [moved] = items.splice(dragIdx, 1);
      items.splice(idx, 0, moved);
      if (type === "tension") return items.map((t, i) => ({ ...t, rank: i + 1 }));
      return items;
    });
    setDragIdx(null); setDragOverIdx(null); setDragItemType(null);
  }, [dragItemType, dragIdx]);

  // Inline edit helper
  const isEditing = (id, key) => editingId === id && editingKey === key;
  const startEdit = (id, key) => { setEditingId(id); setEditingKey(key); };
  const stopEdit = () => { setEditingId(null); setEditingKey(null); };
  const updateTension = (id, key, val) => setAllTensions(prev => prev.map(t => t.id === id ? { ...t, [key]: val } : t));
  const updateProvocation = (id, key, val) => setAllProvocations(prev => prev.map(p => p.id === id ? { ...p, [key]: val } : p));

  // Copy tab content
  const copyTabContent = useCallback(() => {
    let text = "";
    if (activeView === "tensions") {
      text = allTensions.map(t => `${t.rank}. ${t.forceA} \u2194 ${t.forceB}\n${t.summary}\n\nSignificance: ${t.significance}\nCategory relevance: ${t.categoryRelevance}\nStrategic question: ${t.strategicQuestion}\n`).join("\n---\n\n");
    } else if (activeView === "provocations") {
      text = allProvocations.map((p, i) => `${i + 1}. ${p.title}\n${p.text}\nEvidence: ${p.evidence}\n`).join("\n---\n\n");
    } else if (activeView === "narrative" && currentAxis) {
      text = `${currentAxis.narrative.headline}\n\n${currentAxis.narrative.summary}\n\nKey tension: ${currentAxis.narrative.keyTension}`;
    } else if (activeView === "participants") {
      const grouped = {};
      allParticipants.forEach(s => { const seg = s.segment || "Other"; if (!grouped[seg]) grouped[seg] = []; grouped[seg].push(s); });
      text = Object.entries(grouped).map(([seg, participants]) =>
        `## ${seg}\n${participants.map(p => `- ${p.pseudonym || p.id} (${p.demographics || ""})`).join("\n")}`
      ).join("\n\n");
    } else if (activeView === "notes") {
      text = notes.map((n, i) => `${i + 1}. [${n.timestamp}]${n.linkedTruthName ? ` re: ${n.linkedTruthName}` : ""}${n.axis ? ` · ${n.axis}` : ""}\n${n.text}`).join("\n\n");
    }
    navigator.clipboard?.writeText(text);
  }, [activeView, allTensions, allProvocations, currentAxis, allParticipants]);

  /* ─── Shared UI ─── */
  const Tab = ({ k, label }) => (
    <button onClick={() => setActiveView(k)} style={{ padding: "7px 14px", border: activeView === k ? `1.5px solid ${DM.yellow}` : "1.5px solid transparent", borderRadius: "4px", fontFamily: "'Poppins', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.04em", cursor: "pointer", transition: "all 0.15s", background: activeView === k ? "#FFF9DB" : "transparent", color: activeView === k ? DM.black : DM.grey400 }}>{label}</button>
  );
  const SectionLabel = ({ children }) => (
    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.06em", color: DM.grey400, marginBottom: "8px" }}>{children}</div>
  );
  const MarketPill = ({ market }) => (
    <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.grey400, background: DM.grey50, padding: "2px 6px", borderRadius: "3px", border: `1px solid ${DM.grey100}` }}>{market}</span>
  );
  const TensionPill = ({ rank }) => (
    <span style={{ fontFamily: "'Poppins'", fontSize: "9px", fontWeight: 700, color: DM.white, background: DM.red, padding: "2px 7px", borderRadius: "3px" }}>T{rank}</span>
  );
  const EditableText = ({ value, onChange, style, multiline, onStartEdit, onStopEdit }) => {
    const [editing, setEditing] = useState(false);
    if (editing) {
      const Tag = multiline ? "textarea" : "input";
      return <Tag autoFocus value={value} onChange={e => onChange(e.target.value)}
        onBlur={() => { setEditing(false); onStopEdit?.(); }}
        onKeyDown={e => { if (e.key === "Escape") { setEditing(false); onStopEdit?.(); } if (!multiline && e.key === "Enter") { setEditing(false); onStopEdit?.(); } }}
        rows={multiline ? 4 : undefined}
        style={{ ...style, border: `2px solid ${DM.yellow}`, borderRadius: "4px", padding: "6px 10px", background: "#FFFCE8", outline: "none", resize: multiline ? "vertical" : "none", width: "100%", fontFamily: style?.fontFamily || "'Poppins', sans-serif" }} />;
    }
    return <div onClick={() => { setEditing(true); onStartEdit?.(); }} style={{ ...style, cursor: "text", borderRadius: "4px", padding: "2px 4px", margin: "-2px -4px", transition: "background 0.15s" }}
      onMouseEnter={e => e.currentTarget.style.background = "#FFFCE808"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
    >{value}</div>;
  };

  const MiniPreview = ({ axis }) => {
    const s = 140, pad = 12, inner = s - pad * 2;
    return (
      <div style={{ width: s, height: s, position: "relative", background: DM.white, borderRadius: "4px", border: `1px solid ${DM.grey100}`, overflow: "hidden", margin: "0 auto" }}>
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: DM.grey200 }} />
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: DM.grey200 }} />
        {allTruths.map(n => {
          const cy = axis.yPositions[n.id] ?? 0.5;
          const r = Math.max(3, Math.min(6, n.salience * 0.06));
          return <div key={n.id} style={{ position: "absolute", left: `${pad + n.x * inner}px`, top: `${pad + cy * inner}px`, width: `${r * 2}px`, height: `${r * 2}px`, borderRadius: "50%", background: Q_COLORS[getQ(n.x, cy)], opacity: 0.55, transform: "translate(-50%,-50%)" }} />;
        })}
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: DM.white, color: DM.black, height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Poppins:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: ${DM.grey200}; border-radius: 3px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideRight { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }
        @keyframes onboard { from { opacity:0; transform:scale(0.96); } to { opacity:1; transform:scale(1); } }
        @keyframes breathe { 0%,100% { transform:translate(-50%,-50%) scale(1); } 50% { transform:translate(-50%,-50%) scale(1.05); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        textarea:focus, input:focus { border-color: ${DM.yellow} !important; outline: none; }
      `}</style>
      <input ref={fileRef} type="file" accept=".json" style={{ display: "none" }} onChange={handleFileUpload} />
      <input ref={importFileRef} type="file" accept=".json" style={{ display: "none" }} onChange={handleImportAnnotations} />

      {/* ═══ ONBOARDING ═══ */}
      {phase === "onboarding" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", zIndex: 200, display: "grid", placeItems: "center" }}>
          <div style={{ background: DM.white, border: `2px solid ${DM.yellow}`, borderRadius: "4px", padding: "44px 48px", maxWidth: "600px", width: "92%", maxHeight: "90vh", overflowY: "auto", animation: "onboard 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
            <div style={{ marginBottom: "20px" }}><DmLogo height={28} /></div>
            <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "28px", color: DM.black, marginBottom: "12px", lineHeight: 1.1 }}>Human Truth Explorer</h2>
            <p style={{ fontSize: "13px", fontWeight: 300, color: DM.grey600, lineHeight: 1.7, marginBottom: "24px" }}>
              Upload a human truth analysis JSON, choose your strategic lens, and explore the landscape of aspiration and barriers in people{"\u2019"}s lives.
            </p>

            {/* Process steps accordion */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0px", marginBottom: "28px", border: `1px solid ${DM.grey200}`, borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ padding: "10px 14px", background: DM.black }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", fontWeight: 700, color: DM.yellow, letterSpacing: "1.5px", textTransform: "uppercase" }}>How it works</span>
              </div>
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} style={{ borderTop: i > 0 ? `1px solid ${DM.grey200}` : "none" }}>
                  <ProcessStepItem {...step} />
                </div>
              ))}
            </div>

            <button onClick={() => fileRef.current?.click()} style={{ width: "100%", padding: "14px", border: "none", borderRadius: "4px", background: DM.yellow, color: DM.black, fontFamily: "'Anton', sans-serif", fontSize: "14px", cursor: "pointer", marginBottom: "10px" }}>Upload analysis JSON {"\u2192"}</button>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={loadDemo} style={{ flex: 1, padding: "10px", border: `1.5px solid ${DM.grey200}`, borderRadius: "4px", background: "transparent", color: DM.grey400, fontFamily: "'Poppins', sans-serif", fontSize: "11px", cursor: "pointer" }}>View demo with sample data</button>
              <button onClick={() => {
                const link = document.createElement("a");
                link.href = "data:text/plain;charset=utf-8," + encodeURIComponent("Download the full process overview document from your d+m project folder:\n\nFilename: dm_Human_Truth_Explorer_Overview.docx\nLocation: d+m Human Truth Explorer Claude Project \u2192 Project Files\n\nThis document covers the three-stage workflow (Define, Generate, Explore), Explorer features, multi-lens analysis, and strategic value proposition.");
                link.download = "Human_Truth_Explorer_Overview_README.txt";
                link.click();
              }} style={{ flex: 1, padding: "10px", border: `1.5px solid ${DM.grey200}`, borderRadius: "4px", background: "transparent", color: DM.grey400, fontFamily: "'Poppins', sans-serif", fontSize: "11px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>{"\u2193"} Process overview (.docx)</button>
            </div>
            {uploadError && <p style={{ color: "#C82A27", fontSize: "11px", marginTop: "8px" }}>{uploadError}</p>}
          </div>
        </div>
      )}

      {/* ═══ STRATEGIC FRAMING ═══ */}
      {phase === "frame" && meta && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <header style={{ padding: "0 24px", height: "54px", display: "flex", alignItems: "center", gap: "14px", borderBottom: `1px solid ${DM.grey100}`, flexShrink: 0 }}>
            <DmLogo height={22} /><div style={{ width: "1px", height: "22px", background: DM.grey200 }} />
            <span style={{ fontFamily: "'Anton', sans-serif", fontSize: "14px" }}>Human Truth Explorer</span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", color: DM.grey400 }}>{meta.territory} {"\u00B7"} {allTruths.length} truths {isDemo ? "\u00B7 Demo" : ""}</span>
          </header>
          <div style={{ flex: 1, overflow: "auto", display: "flex", justifyContent: "center", padding: "40px" }}>
            <div style={{ display: "flex", gap: "40px", maxWidth: "1100px", width: "100%", animation: "fadeUp 0.4s ease-out" }}>
              {/* Left: narratives */}
              <div style={{ flex: 1, maxWidth: "440px" }}>
                <SectionLabel>Extracted truths</SectionLabel>
                <h2 style={{ fontFamily: "'Anton'", fontSize: "26px", lineHeight: 1.1, marginBottom: "6px" }}>{allTruths.length} truths from {meta.territory}</h2>
                <p style={{ fontSize: "12px", fontWeight: 300, color: DM.grey600, lineHeight: 1.65, marginBottom: "24px" }}>These truths were surfaced through linguistic analysis of interview transcripts. Review them, then choose a strategic lens.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", maxHeight: "calc(100vh - 340px)", overflowY: "auto" }}>
                  {[...allTruths].sort((a, b) => b.salience - a.salience).map(n => (
                    <div key={n.id} style={{ padding: "10px 14px", background: DM.grey50, borderRadius: "4px", display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", minWidth: "36px" }}>
                        <span style={{ fontFamily: "'Anton'", fontSize: "16px" }}>{n.salience}%</span>
                        <span style={{ fontFamily: "'Space Mono'", fontSize: "7px", color: DM.grey400 }}>{n.salience > 50 ? "HIGH" : n.salience > 25 ? "MOD" : "LOW"}</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "2px" }}>{n.name}</div>
                        <div style={{ fontSize: "10px", fontWeight: 300, color: DM.grey600, lineHeight: 1.5 }}>{n.description.slice(0, 120)}...</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right: lenses */}
              <div style={{ flex: 1, maxWidth: "560px" }}>
                <SectionLabel>Strategic lenses</SectionLabel>
                <h2 style={{ fontFamily: "'Anton'", fontSize: "26px", lineHeight: 1.1, marginBottom: "6px" }}>How do you want to read these truths?</h2>
                <p style={{ fontSize: "12px", fontWeight: 300, color: DM.grey600, lineHeight: 1.65, marginBottom: "24px" }}>
                  {allAxes.filter(a => !a._custom).length} lenses proposed. Choose one, or describe a new angle.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                  {allAxes.map(ax => (
                    <div key={ax.id} onClick={() => setSelectedAxisId(ax.id)} style={{ padding: "14px 18px", borderRadius: "4px", cursor: "pointer", border: selectedAxisId === ax.id ? `2px solid ${DM.yellow}` : `1.5px solid ${DM.grey200}`, background: selectedAxisId === ax.id ? "#FFFCE8" : DM.white, transition: "all 0.2s" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                        <div style={{ width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0, border: selectedAxisId === ax.id ? `2px solid ${DM.yellow}` : `1.5px solid ${DM.grey200}`, background: selectedAxisId === ax.id ? DM.yellow : "transparent", display: "grid", placeItems: "center", transition: "all 0.2s" }}>
                          {selectedAxisId === ax.id && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: DM.black }} />}
                        </div>
                        <span style={{ fontFamily: "'Anton'", fontSize: "15px" }}>{ax.name}</span>
                        {ax._custom && <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.yellow, background: "#FFF9DB", padding: "2px 6px", borderRadius: "3px" }}>Custom</span>}
                      </div>
                      <p style={{ fontSize: "11px", fontWeight: 300, color: DM.grey600, lineHeight: 1.55, paddingLeft: "28px" }}>{ax.rationale}</p>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "20px", borderRadius: "4px", border: `1.5px dashed ${DM.grey200}`, background: DM.grey50 }}>
                  <div style={{ fontSize: "11px", fontWeight: 600, marginBottom: "8px" }}>Propose a new angle</div>
                  <textarea value={newAngle} onChange={e => setNewAngle(e.target.value)} placeholder={"e.g. 'How does trust differ for inherited vs. self-made wealth?'\ne.g. 'Where does each narrative sit on local vs. global?'"} rows={3}
                    style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${DM.grey200}`, borderRadius: "4px", fontFamily: "'Poppins'", fontSize: "12px", color: DM.black, resize: "vertical", background: DM.white }} />
                  <button onClick={generateAxis} disabled={!newAngle.trim() || generating}
                    style={{ marginTop: "10px", width: "100%", padding: "12px", border: "none", borderRadius: "4px", background: newAngle.trim() && !generating ? DM.nearBlack : DM.grey100, color: newAngle.trim() && !generating ? DM.white : DM.grey400, fontFamily: "'Poppins'", fontSize: "12px", fontWeight: 500, cursor: newAngle.trim() && !generating ? "pointer" : "default" }}>
                    {generating ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}><span style={{ width: "14px", height: "14px", border: "2px solid transparent", borderTopColor: DM.white, borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />Generating...</span> : "Generate new lens"}
                  </button>
                  {genError && <p style={{ color: "#C82A27", fontSize: "10px", marginTop: "6px" }}>{genError}</p>}
                </div>
                <button onClick={() => selectedAxisId && applyAxis(selectedAxisId)}
                  style={{ marginTop: "24px", width: "100%", padding: "14px", border: "none", borderRadius: "4px", background: selectedAxisId ? DM.yellow : DM.grey100, color: selectedAxisId ? DM.black : DM.grey400, fontFamily: "'Anton'", fontSize: "14px", cursor: selectedAxisId ? "pointer" : "default" }}>
                  {selectedAxisId ? "Generate map \u2192" : "Select or create a lens to continue"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ EXPLORER ═══ */}
      {phase === "explorer" && currentAxis && (<>
        {/* Initials prompt */}
        {showInitialsPrompt && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)", zIndex: 300, display: "grid", placeItems: "center" }}>
            <div style={{ background: DM.white, border: `2px solid ${DM.yellow}`, borderRadius: "6px", padding: "32px 36px", maxWidth: "360px", width: "90%", animation: "onboard 0.25s cubic-bezier(0.16,1,0.3,1)" }}>
              <div style={{ fontFamily: "'Anton'", fontSize: "20px", marginBottom: "8px" }}>Who's analysing?</div>
              <p style={{ fontSize: "12px", fontWeight: 300, color: DM.grey600, lineHeight: 1.65, marginBottom: "20px" }}>Your initials will be attached to any notes you add, so collaborators can see who wrote what when you share annotations.</p>
              <input
                autoFocus
                value={initialsInput}
                onChange={e => setInitialsInput(e.target.value.toUpperCase().slice(0, 4))}
                onKeyDown={e => e.key === "Enter" && confirmInitials()}
                placeholder="e.g. JD"
                maxLength={4}
                style={{ width: "100%", padding: "12px 16px", border: `1.5px solid ${DM.grey200}`, borderRadius: "4px", fontFamily: "'Anton'", fontSize: "24px", letterSpacing: "0.1em", textAlign: "center", outline: "none", marginBottom: "12px", color: DM.black }}
              />
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => { setInitialsInput("?"); confirmInitials(); }} style={{ flex: 1, padding: "10px", border: `1.5px solid ${DM.grey200}`, borderRadius: "4px", background: "transparent", fontFamily: "'Poppins'", fontSize: "11px", color: DM.grey400, cursor: "pointer" }}>Skip</button>
                <button onClick={confirmInitials} style={{ flex: 2, padding: "10px", border: "none", borderRadius: "4px", background: DM.yellow, fontFamily: "'Anton'", fontSize: "14px", cursor: "pointer" }}>Start →</button>
              </div>
            </div>
          </div>
        )}
        <header style={{ padding: "0 24px", height: "54px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${DM.grey100}`, zIndex: 50, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <DmLogo height={22} /><div style={{ width: "1px", height: "22px", background: DM.grey200 }} />
            <span style={{ fontFamily: "'Anton'", fontSize: "14px" }}>Human Truth Explorer</span>
            <span style={{ fontFamily: "'Space Mono'", fontSize: "9px", color: DM.grey400 }}>{meta?.territory} {isDemo ? "\u00B7 Demo" : ""}</span>
            <div style={{ width: "1px", height: "16px", background: DM.grey100 }} />
            <button onClick={() => { setPhase("frame"); setSelectedTruth(null); }} style={{ padding: "4px 10px", border: `1px solid ${DM.grey200}`, borderRadius: "4px", background: "transparent", fontFamily: "'Space Mono'", fontSize: "8px", color: DM.grey400, cursor: "pointer" }}>Lens: {currentAxis.name} {"\u270E"}</button>
            {saveStatus === "saved" && <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: "#2A8C51", animation: "fadeUp 0.3s ease-out" }}>✓ Saved</span>}
            {saveStatus === "saving" && <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.grey400 }}>Saving…</span>}
          </div>
          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            {userInitials && userInitials !== "?" && (
              <button onClick={() => setShowInitialsPrompt(true)} style={{ padding: "3px 8px", border: `1.5px solid ${DM.yellow}`, borderRadius: "20px", background: DM.yellow, fontFamily: "'Anton'", fontSize: "11px", color: DM.black, cursor: "pointer" }}>{userInitials}</button>
            )}
            <Tab k="map" label="Map" /><Tab k="tensions" label="Tensions" /><Tab k="provocations" label="Provocations" /><Tab k="narrative" label="Strategic Narrative" /><Tab k="participants" label="Participants" /><Tab k="notes" label={`Notes${notes.length ? ` (${notes.length})` : ""}`} />
            <div style={{ width: "1px", height: "16px", background: DM.grey100, margin: "0 4px" }} />
            {activeView !== "map" && (
              <button onClick={copyTabContent} style={{ padding: "4px 10px", border: `1px solid ${DM.grey200}`, borderRadius: "4px", background: "transparent", fontFamily: "'Space Mono'", fontSize: "8px", color: DM.grey400, cursor: "pointer" }}>Copy</button>
            )}
            <button onClick={resetAll} style={{ padding: "4px 10px", border: `1px solid ${DM.red}40`, borderRadius: "4px", background: "transparent", fontFamily: "'Space Mono'", fontSize: "8px", color: DM.red, cursor: "pointer" }}>Reset</button>
          </div>
        </header>

        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

          {/* ─── MAP TAB ─── */}
          {activeView === "map" && (<>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "14px 14px 14px 18px", maxWidth: "50%" }}>
              {allSegments.length > 1 && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px", flexShrink: 0 }}>
                  <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.grey400, letterSpacing: "0.06em" }}>SEGMENT</span>
                  <button onClick={() => setActiveSegment(null)} style={{ padding: "3px 10px", border: `1.5px solid ${!activeSegment ? DM.black : DM.grey200}`, borderRadius: "20px", background: !activeSegment ? DM.black : "transparent", color: !activeSegment ? DM.white : DM.grey400, fontFamily: "'Poppins'", fontSize: "10px", fontWeight: 500, cursor: "pointer", transition: "all 0.15s" }}>All</button>
                  {allSegments.map(seg => (
                    <button key={seg} onClick={() => setActiveSegment(activeSegment === seg ? null : seg)} style={{ padding: "3px 10px", border: `1.5px solid ${activeSegment === seg ? DM.black : DM.grey200}`, borderRadius: "20px", background: activeSegment === seg ? DM.black : "transparent", color: activeSegment === seg ? DM.white : DM.grey400, fontFamily: "'Poppins'", fontSize: "10px", fontWeight: 500, cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap" }}>{seg}</button>
                  ))}
                </div>
              )}
              <div style={{ display: "flex", gap: "4px", marginBottom: "10px", flexShrink: 0 }}>
                {["topLeft", "topRight", "bottomLeft", "bottomRight"].map(key => { const m = qMeta(key); return (
                  <div key={key} onClick={() => { setSelectedQuadrant(key); setSelectedTruth(null); }} style={{ flex: 1, padding: "8px 10px", borderRadius: "4px", border: selectedQuadrant === key ? `2px solid ${Q_COLORS[key]}` : `1px solid ${DM.grey100}`, background: selectedQuadrant === key ? `${Q_COLORS[key]}08` : DM.white, cursor: "pointer", transition: "all 0.15s" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                      <div style={{ width: "7px", height: "7px", borderRadius: "2px", background: Q_COLORS[key] }} />
                      <span style={{ fontSize: "9px", fontWeight: 600, color: Q_COLORS[key] }}>{m.label}</span>
                    </div>
                    <div style={{ fontSize: "9px", fontWeight: 300, color: DM.grey400, paddingLeft: "13px" }}>{m.tagline}</div>
                  </div>
                ); })}
              </div>
              <div ref={mapRef} style={{ flex: 1, position: "relative", background: DM.white, borderRadius: "4px", border: `1px solid ${DM.grey200}`, overflow: "hidden", cursor: dragging ? "grabbing" : "default" }}>
                <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: DM.grey200 }} />
                <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: DM.grey200 }} />
                {[0.25, 0.75].map(p => <div key={`v${p}`} style={{ position: "absolute", left: `${p * 100}%`, top: 0, bottom: 0, width: "1px", background: DM.grey100 }} />)}
                {[0.25, 0.75].map(p => <div key={`h${p}`} style={{ position: "absolute", top: `${p * 100}%`, left: 0, right: 0, height: "1px", background: DM.grey100 }} />)}
                <div style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%) rotate(-90deg)", fontFamily: "'Anton'", fontSize: "10px", letterSpacing: "0.1em", color: DM.grey200 }}>Articulated</div>
                <div style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%) rotate(90deg)", fontFamily: "'Anton'", fontSize: "10px", letterSpacing: "0.1em", color: DM.grey200 }}>Unarticulated</div>
                <div style={{ position: "absolute", top: "8px", left: "50%", transform: "translateX(-50%)", fontFamily: "'Anton'", fontSize: "10px", letterSpacing: "0.1em", color: DM.grey200 }}>{currentAxis.topLabel}</div>
                <div style={{ position: "absolute", bottom: "8px", left: "50%", transform: "translateX(-50%)", fontFamily: "'Anton'", fontSize: "10px", letterSpacing: "0.1em", color: DM.grey200 }}>{currentAxis.bottomLabel}</div>
                {[{key:"topLeft",s:{left:"32px",top:"26px"}},{key:"topRight",s:{right:"14px",top:"26px",textAlign:"right"}},{key:"bottomLeft",s:{left:"32px",bottom:"26px"}},{key:"bottomRight",s:{right:"14px",bottom:"26px",textAlign:"right"}}].map(({key,s})=>(
                  <div key={`ql-${key}`} onClick={() => { setSelectedQuadrant(key); setSelectedTruth(null); }} style={{ position:"absolute",...s,cursor:"pointer",padding:"4px 6px",borderRadius:"3px",transition:"all 0.15s",background:selectedQuadrant===key?`${Q_COLORS[key]}12`:"transparent" }}
                    onMouseEnter={e => e.currentTarget.style.background=`${Q_COLORS[key]}12`} onMouseLeave={e => { if(selectedQuadrant!==key) e.currentTarget.style.background="transparent"; }}>
                    <div style={{ fontFamily:"'Poppins'",fontSize:"10px",fontWeight:600,color:Q_COLORS[key],opacity:0.65 }}>{qMeta(key).label}</div>
                    <div style={{ fontFamily:"'Poppins'",fontSize:"8px",fontWeight:300,color:Q_COLORS[key],opacity:0.4 }}>{qMeta(key).tagline}</div>
                  </div>
                ))}
                {truths.map(n => {
                  if (n.y == null) return null;
                  const sal = activeSalience ? activeSalience(n) : n.salience;
                  const qk = getQ(n.x, n.y); const col = Q_COLORS[qk];
                  const isSel = selectedTruth?.id === n.id;
                  const isHov = hoveredTruth === n.id;
                  const isDim = selectedTruth && !isSel;
                  const r = Math.max(18, Math.min(34, sal * 0.38));
                  return (
                    <div key={n.id} onMouseDown={e => handleMouseDown(e, n)}
                      onMouseEnter={() => setHoveredTruth(n.id)} onMouseLeave={() => setHoveredTruth(null)}
                      onClick={() => { setSelectedTruth(n); setSelectedQuadrant(null); }}
                      style={{ position: "absolute", left: `${n.x * 100}%`, top: `${n.y * 100}%`, transform: "translate(-50%,-50%)", zIndex: isSel ? 20 : isHov ? 15 : 1, cursor: dragging === n.id ? "grabbing" : "grab", transition: dragging === n.id ? "none" : "opacity 0.3s", opacity: isDim ? 0.2 : 1, animation: isSel && !dragging ? "breathe 3s ease-in-out infinite" : "none" }}>
                      <div style={{ width: `${r * 2}px`, height: `${r * 2}px`, borderRadius: "50%", background: isSel ? `radial-gradient(circle at 35% 35%,${col}55,${col}22)` : isHov ? `radial-gradient(circle at 35% 35%,${col}40,${col}15)` : `radial-gradient(circle at 35% 35%,${col}30,${col}10)`, border: `1.5px solid ${isSel ? col : isHov ? col + 'AA' : col + '60'}`, display: "grid", placeItems: "center", transition: "all 0.2s", boxShadow: isSel ? `0 2px 12px ${col}25` : "0 1px 3px rgba(0,0,0,0.05)" }}>
                        <span style={{ fontFamily: "'Space Mono'", fontSize: r > 24 ? "10px" : "8px", fontWeight: 700, color: isSel ? DM.black : DM.grey600 }}>{sal}%</span>
                      </div>
                      <div style={{ position: "absolute", top: `${r * 2 + 4}px`, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", fontFamily: "'Poppins'", fontSize: "9px", fontWeight: isSel ? 600 : 500, color: isSel ? DM.black : DM.grey600 }}>{n.name}</div>
                    </div>
                  );
                })}
                {/* Quick note button */}
                {!quickNoteOpen && (
                  <button onClick={e => { e.stopPropagation(); setQuickNoteOpen(true); }}
                    style={{ position: "absolute", bottom: "12px", left: "12px", zIndex: 30, display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", border: `1px solid ${DM.grey200}`, borderRadius: "20px", background: DM.white, color: DM.grey600, fontFamily: "'Poppins'", fontSize: "11px", fontWeight: 500, cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", transition: "all 0.15s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = DM.yellow; e.currentTarget.style.color = DM.black; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = DM.grey200; e.currentTarget.style.color = DM.grey600; }}>
                    <span style={{ fontSize: "14px", lineHeight: 1 }}>✎</span> Add note
                    {notes.length > 0 && <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.grey400 }}>{notes.length}</span>}
                  </button>
                )}
                {/* Quick note input overlay */}
                {quickNoteOpen && (
                  <div onClick={e => e.stopPropagation()} style={{ position: "absolute", bottom: "12px", left: "12px", right: "12px", zIndex: 30, background: DM.white, border: `2px solid ${DM.yellow}`, borderRadius: "6px", padding: "12px 14px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
                    <textarea autoFocus value={quickNoteText} onChange={e => setQuickNoteText(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); if (quickNoteText.trim()) { addNote(quickNoteText, selectedTruth?.id || null); setQuickNoteText(""); setQuickNoteOpen(false); } }
                        if (e.key === "Escape") { setQuickNoteOpen(false); setQuickNoteText(""); }
                      }}
                      placeholder={selectedTruth ? `Note on "${selectedTruth.name}"… (Enter to save, Shift+Enter for newline)` : "Write a note… (Enter to save, Shift+Enter for newline)"}
                      rows={2}
                      style={{ width: "100%", border: "none", outline: "none", fontFamily: "'Poppins'", fontSize: "12px", fontWeight: 300, color: DM.nearBlack, resize: "none", lineHeight: 1.6, background: "transparent" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                      <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.grey400 }}>
                        {selectedTruth ? `Linked to: ${selectedTruth.name}` : "No truth selected"}
                      </span>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button onClick={() => { setQuickNoteOpen(false); setQuickNoteText(""); }} style={{ padding: "4px 10px", border: `1px solid ${DM.grey200}`, borderRadius: "4px", background: "transparent", color: DM.grey400, fontFamily: "'Poppins'", fontSize: "10px", cursor: "pointer" }}>Cancel</button>
                        <button onClick={() => { if (quickNoteText.trim()) { addNote(quickNoteText, selectedTruth?.id || null); setQuickNoteText(""); setQuickNoteOpen(false); } }}
                          disabled={!quickNoteText.trim()}
                          style={{ padding: "4px 14px", border: "none", borderRadius: "4px", background: quickNoteText.trim() ? DM.yellow : DM.grey100, color: quickNoteText.trim() ? DM.black : DM.grey400, fontFamily: "'Poppins'", fontSize: "10px", fontWeight: 600, cursor: quickNoteText.trim() ? "pointer" : "default" }}>Save</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Detail panel - right 50% */}
            <div style={{ width: "50%", borderLeft: `1px solid ${DM.grey100}`, background: DM.grey50, overflowY: "auto", flexShrink: 0 }}>
              {selectedTruth ? (() => {
                const n = selectedTruth; const qk = getQ(n.x, n.y); const col = Q_COLORS[qk]; const m = qMeta(qk);
                return (
                  <div style={{ padding: "22px 24px", animation: "slideRight 0.3s ease-out" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                          <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: col }} />
                          <span style={{ fontFamily: "'Space Mono'", fontSize: "9px", color: col }}>{m.label}</span>
                          {(n.markets || [...new Set((n.participants || []).map(pid => allParticipants.find(p => p.id === pid)).filter(Boolean).map(p => p.market || p.demographics?.split(',').pop()?.trim()).filter(Boolean))]).map(mk => <MarketPill key={mk} market={mk} />)}
                        </div>
                        <h3 style={{ fontFamily: "'Anton'", fontSize: "22px", lineHeight: 1.1 }}>{n.name}</h3>
                      </div>
                      <button onClick={() => setSelectedTruth(null)} style={{ background: DM.grey100, border: "none", borderRadius: "4px", color: DM.grey400, padding: "4px 8px", fontSize: "11px", cursor: "pointer" }}>{"\u2715"}</button>
                    </div>
                    <p style={{ fontSize: "12px", fontWeight: 300, color: DM.grey600, lineHeight: 1.7, marginBottom: "20px" }}>{n.description}</p>
                    {/* Add note from detail */}
                    <button onClick={() => { setQuickNoteOpen(true); setActiveView("map"); }}
                      style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "20px", padding: "6px 12px", border: `1px solid ${DM.grey200}`, borderRadius: "4px", background: "transparent", color: DM.grey600, fontFamily: "'Poppins'", fontSize: "10px", cursor: "pointer", transition: "all 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = DM.yellow; e.currentTarget.style.color = DM.black; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = DM.grey200; e.currentTarget.style.color = DM.grey600; }}>
                      <span style={{ fontSize: "12px" }}>✎</span> Add note about this truth
                      {notes.filter(nt => nt.linkedTruthId === n.id).length > 0 && (
                        <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.yellow, background: "#FFF9DB", padding: "1px 6px", borderRadius: "3px" }}>{notes.filter(nt => nt.linkedTruthId === n.id).length} note{notes.filter(nt => nt.linkedTruthId === n.id).length > 1 ? "s" : ""}</span>
                      )}
                    </button>
                    <div style={{ marginBottom: "20px" }}>
                      <SectionLabel>Salience</SectionLabel>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ flex: 1, height: "3px", background: DM.grey100, borderRadius: "2px" }}><div style={{ width: `${n.salience}%`, height: "100%", background: DM.yellow, borderRadius: "2px" }} /></div>
                        <span style={{ fontFamily: "'Anton'", fontSize: "18px" }}>{n.salience}%</span>
                      </div>
                      <div style={{ fontSize: "10px", fontWeight: 300, color: DM.grey400, marginTop: "3px" }}>{n.salience > 50 ? "High" : n.salience > 25 ? "Moderate" : "Emerging"} presence</div>
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                      <SectionLabel>Feels {"\u00B7"} Speaks {"\u00B7"} Drives {"\u00B7"} Means</SectionLabel>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        {n.emotionalRegister && (
                          <div style={{ padding: "10px 14px", borderRadius: "4px", background: DM.white, border: `1px solid ${DM.grey100}`, borderLeft: `2px solid #EB573F` }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                              <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: "#EB573F" }}>Emotional Register</span>
                              <span style={{ fontSize: "12px", fontWeight: 600 }}>{n.emotionalRegister.primary}</span>
                              <span style={{ fontSize: "10px", color: DM.grey400 }}>+ {n.emotionalRegister.secondary}</span>
                            </div>
                            <p style={{ fontSize: "9px", fontWeight: 300, color: DM.grey400, lineHeight: 1.4 }}>{n.emotionalRegister.rationale}</p>
                          </div>
                        )}
                        {n.metaphorFamily && (
                          <div style={{ padding: "10px 14px", borderRadius: "4px", background: DM.white, border: `1px solid ${DM.grey100}`, borderLeft: `2px solid #0A3A75` }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                              <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: "#0A3A75" }}>Metaphor Family</span>
                              <span style={{ fontSize: "11px", fontWeight: 600 }}>{n.metaphorFamily.primary}</span>
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "4px" }}>
                              {n.metaphorFamily.examples?.map((ex, i) => (
                                <span key={i} style={{ fontSize: "9px", color: DM.grey600, background: DM.grey50, padding: "2px 6px", borderRadius: "3px", fontStyle: "italic" }}>{ex}</span>
                              ))}
                            </div>
                            <p style={{ fontSize: "9px", fontWeight: 300, color: DM.grey400, lineHeight: 1.4 }}>{n.metaphorFamily.rationale}</p>
                          </div>
                        )}
                        {n.culturalStrategy && (
                          <div style={{ padding: "10px 14px", borderRadius: "4px", background: DM.white, border: `1px solid ${DM.grey100}`, borderLeft: `2px solid ${DM.yellow}` }}>
                            <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.nearBlack }}>Cultural Strategy</span>
                            {["orthodoxy", "contradiction", "opportunity"].map(k => (
                              <div key={k} style={{ marginTop: "6px" }}>
                                <span style={{ fontSize: "9px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: k === "opportunity" ? DM.red : DM.grey400 }}>{k}</span>
                                <p style={{ fontSize: "10px", fontWeight: 300, color: DM.grey600, lineHeight: 1.45 }}>{n.culturalStrategy[k]}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        {n.reissMotivation && (
                          <div style={{ padding: "10px 14px", borderRadius: "4px", background: DM.white, border: `1px solid ${DM.grey100}`, borderLeft: "2px solid #2A8C51" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                              <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: "#2A8C51" }}>Reiss Motivation</span>
                              <span style={{ fontSize: "12px", fontWeight: 600 }}>{n.reissMotivation.primary}</span>
                              {n.reissMotivation.secondary && <span style={{ fontSize: "10px", color: DM.grey400 }}>+ {n.reissMotivation.secondary}</span>}
                            </div>
                            <p style={{ fontSize: "9px", fontWeight: 300, color: DM.grey400, lineHeight: 1.4 }}>{n.reissMotivation.notes}</p>
                          </div>
                        )}
                        {n.archetype && (
                          <div style={{ padding: "10px 14px", borderRadius: "4px", background: DM.white, border: `1px solid ${DM.grey100}`, borderLeft: "2px solid #8B5CF6" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                              <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: "#8B5CF6" }}>Archetype</span>
                              <span style={{ fontSize: "12px", fontWeight: 600 }}>{n.archetype.primary}</span>
                              {n.archetype.secondary && <span style={{ fontSize: "10px", color: DM.grey400 }}>+ {n.archetype.secondary}</span>}
                            </div>
                            <p style={{ fontSize: "9px", fontWeight: 300, color: DM.grey400, lineHeight: 1.4 }}>{n.archetype.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {n.quotes?.length > 0 && (
                      <div style={{ marginBottom: "20px" }}>
                        <SectionLabel>Verbatim quotes</SectionLabel>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          {n.quotes.map((q, i) => (
                            <div key={i} style={{ padding: "12px 14px", background: DM.white, borderRadius: "4px", borderLeft: `2px solid ${DM.grey200}` }}>
                              <p style={{ fontSize: "12px", fontStyle: "italic", color: DM.nearBlack, lineHeight: 1.6 }}>{"\u201C"}{q.text}{"\u201D"}</p>
                              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px" }}>
                                <span style={{ fontSize: "10px", fontWeight: 500, color: DM.grey400 }}>{q.participant ? (allParticipants.find(p => p.id === q.participant)?.pseudonym || q.participant) : q.source}</span>
                                {q.market && <MarketPill market={q.market} />}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {n.linguisticPatterns?.length > 0 && (
                      <div style={{ marginBottom: "20px" }}>
                        <SectionLabel>Linguistic patterns</SectionLabel>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                          {n.linguisticPatterns.map((lp, i) => (
                            <span key={i} style={{ fontSize: "10px", color: DM.grey600, background: DM.white, padding: "4px 8px", borderRadius: "4px", border: `1px solid ${DM.grey100}` }}>{lp}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {n.relatedTruths?.length > 0 && (
                      <div>
                        <SectionLabel>Related truths</SectionLabel>
                        <div style={{ display: "flex", gap: "4px" }}>
                          {n.relatedTruths.map(rid => {
                            const rn = truths.find(nn => nn.id === rid); if (!rn) return null;
                            const rqk = getQ(rn.x, rn.y);
                            return (
                              <button key={rid} onClick={() => { setSelectedTruth(rn); setSelectedQuadrant(null); }} style={{ flex: 1, padding: "8px 10px", background: DM.white, border: `1px solid ${DM.grey100}`, borderRadius: "4px", cursor: "pointer", textAlign: "left" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                                  <div style={{ width: "6px", height: "6px", borderRadius: "2px", background: Q_COLORS[rqk] }} />
                                  <span style={{ fontSize: "10px", fontWeight: 600 }}>{rn.name}</span>
                                </div>
                                <span style={{ fontFamily: "'Space Mono'", fontSize: "9px", color: DM.grey400 }}>{rn.salience}%</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })() : selectedQuadrant ? (() => {
                const qk = selectedQuadrant; const col = Q_COLORS[qk]; const m = qMeta(qk);
                const qTruths = truths.filter(n => n.y != null && getQ(n.x, n.y) === qk).sort((a, b) => b.salience - a.salience);
                const isDominant = qk === "topLeft" || qk === "bottomLeft";
                const isTop = qk === "topLeft" || qk === "topRight";
                const quadrantStrategicNotes = {
                  topLeft: `This is where articulated truths align with ${currentAxis.topLabel.toLowerCase()}. These are the things people can name and describe clearly \u2014 high salience, shared across participants. Important to understand but the strategic value often lies elsewhere.`,
                  topRight: `Unarticulated truths that lean toward ${currentAxis.topLabel.toLowerCase()}. These are truths people can\u2019t quite name but their language reveals \u2014 lower salience but potentially more strategically valuable. This is where deeper insight lives.`,
                  bottomLeft: `The articulated ${currentAxis.bottomLabel.toLowerCase()} truths. People can describe these clearly and they appear frequently across interviews. These are the surface-level barriers and patterns \u2014 real, but often masking deeper truths.`,
                  bottomRight: `Unarticulated territory where ${currentAxis.bottomLabel.toLowerCase()} hides beneath the surface. These truths emerge through linguistic patterns, metaphors, and contradictions rather than direct statement. Highest strategic potential \u2014 this is what people are really telling us.`,
                };
                return (
                  <div style={{ padding: "22px 24px", animation: "slideRight 0.3s ease-out" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                          <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: col }} />
                          <span style={{ fontFamily: "'Space Mono'", fontSize: "9px", letterSpacing: "0.06em", color: col }}>{isDominant ? "ARTICULATED" : "UNARTICULATED"} {"\u00B7"} {isTop ? currentAxis.topLabel.toUpperCase() : currentAxis.bottomLabel.toUpperCase()}</span>
                        </div>
                        <h3 style={{ fontFamily: "'Anton'", fontSize: "24px", lineHeight: 1.1, color: DM.black }}>{m.label}</h3>
                        <p style={{ fontSize: "12px", fontWeight: 300, color: col, marginTop: "4px" }}>{m.tagline}</p>
                      </div>
                      <button onClick={() => setSelectedQuadrant(null)} style={{ background: DM.grey100, border: "none", borderRadius: "4px", color: DM.grey400, padding: "4px 8px", fontSize: "11px", cursor: "pointer" }}>{"\u2715"}</button>
                    </div>
                    {/* Strategic summary */}
                    <div style={{ padding: "16px 18px", borderRadius: "4px", background: DM.white, borderLeft: `3px solid ${col}`, marginBottom: "20px" }}>
                      <div style={{ fontSize: "10px", fontWeight: 600, color: col, marginBottom: "6px" }}>Strategic significance</div>
                      <p style={{ fontSize: "12px", fontWeight: 300, color: DM.grey600, lineHeight: 1.7 }}>{quadrantStrategicNotes[qk]}</p>
                    </div>
                    {/* Truths in this quadrant */}
                    <SectionLabel>Truths in this quadrant ({qTruths.length})</SectionLabel>
                    {qTruths.length > 0 ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "20px" }}>
                        {qTruths.map(n => (
                          <button key={n.id} onClick={() => { setSelectedTruth(n); setSelectedQuadrant(null); }}
                            style={{ padding: "14px 16px", background: DM.white, border: `1px solid ${DM.grey100}`, borderRadius: "4px", cursor: "pointer", textAlign: "left", transition: "all 0.15s", display: "flex", alignItems: "flex-start", gap: "12px" }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = col + "60"} onMouseLeave={e => e.currentTarget.style.borderColor = DM.grey100}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", minWidth: "36px", flexShrink: 0 }}>
                              <span style={{ fontFamily: "'Anton'", fontSize: "16px", color: col }}>{n.salience}%</span>
                              <span style={{ fontFamily: "'Space Mono'", fontSize: "7px", color: DM.grey400 }}>{n.salience > 50 ? "HIGH" : n.salience > 25 ? "MOD" : "LOW"}</span>
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: "13px", fontWeight: 600, color: DM.black, marginBottom: "3px" }}>{n.name}</div>
                              <div style={{ fontSize: "10px", fontWeight: 300, color: DM.grey600, lineHeight: 1.5 }}>{n.description.slice(0, 140)}...</div>
                              {n.emotionalRegister && (
                                <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
                                  <span style={{ fontSize: "9px", color: "#EB573F", background: "#EB573F10", padding: "2px 6px", borderRadius: "3px" }}>{n.emotionalRegister.primary}</span>
                                  {n.metaphorFamily && <span style={{ fontSize: "9px", color: "#0A3A75", background: "#0A3A7510", padding: "2px 6px", borderRadius: "3px" }}>{n.metaphorFamily.primary}</span>}
                                  {n.archetype && <span style={{ fontSize: "9px", color: "#8B5CF6", background: "#8B5CF610", padding: "2px 6px", borderRadius: "3px" }}>{n.archetype.primary}</span>}
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div style={{ padding: "20px", background: DM.grey50, borderRadius: "4px", textAlign: "center", marginBottom: "20px" }}>
                        <p style={{ fontSize: "12px", fontWeight: 300, color: DM.grey400 }}>No truths currently positioned in this quadrant.</p>
                        <p style={{ fontSize: "10px", fontWeight: 300, color: DM.grey400, marginTop: "4px" }}>Try a different lens, or drag truths here from the map.</p>
                      </div>
                    )}
                    {/* Key quotes from this quadrant */}
                    {(() => {
                      const allQuotes = qTruths.flatMap(n => (n.quotes || []).map(q => ({ ...q, narrativeName: n.name }))).slice(0, 4);
                      if (!allQuotes.length) return null;
                      return (
                        <div>
                          <SectionLabel>Representative voices</SectionLabel>
                          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                            {allQuotes.map((q, i) => (
                              <div key={i} style={{ padding: "12px 14px", background: DM.white, borderRadius: "4px", borderLeft: `2px solid ${col}40` }}>
                                <p style={{ fontSize: "11px", fontStyle: "italic", color: DM.nearBlack, lineHeight: 1.6 }}>{"\u201C"}{q.text}{"\u201D"}</p>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px" }}>
                                  <span style={{ fontSize: "9px", fontWeight: 500, color: DM.grey400 }}>{q.participant ? (allParticipants.find(p => p.id === q.participant)?.pseudonym || q.participant) : q.source}</span>
                                  {q.market && <MarketPill market={q.market} />}
                                  <span style={{ fontSize: "8px", color: col, background: `${col}10`, padding: "1px 5px", borderRadius: "3px", marginLeft: "auto" }}>{q.narrativeName}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                );
              })() : (
                <div style={{ padding: "60px 40px", textAlign: "center", color: DM.grey400 }}>
                  <div style={{ fontSize: "36px", marginBottom: "12px", opacity: 0.2 }}>{"\u25CB"}</div>
                  <p style={{ fontSize: "13px", fontWeight: 300 }}>Click a truth on the map to explore</p>
                  <p style={{ fontSize: "10px", fontWeight: 300, marginTop: "4px" }}>Drag to reposition {"\u00B7"} Click for detail</p>
                </div>
              )}
            </div>
          </>)}

          {/* ─── TENSIONS TAB ─── */}
          {activeView === "tensions" && (
            <div style={{ flex: 1, overflowY: "auto", padding: "40px" }}>
              <div style={{ maxWidth: "780px", margin: "0 auto", animation: "fadeUp 0.4s ease-out" }}>
                <SectionLabel>Tensions {"\u00B7"} Priority ranked</SectionLabel>
                <h2 style={{ fontFamily: "'Anton'", fontSize: "28px", lineHeight: 1.1, marginBottom: "6px" }}>{allTensions.length} strategic tensions</h2>
                <p style={{ fontSize: "12px", fontWeight: 300, color: DM.grey600, lineHeight: 1.65, marginBottom: "24px" }}>Drag to reorder. Click any text to edit. Tensions are ranked by evidence strength, cultural significance, and category relevance.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {allTensions.map((t, idx) => {
                    const isExpanded = expandedTension === t.id;
                    return (
                    <div key={t.id} draggable onDragStart={() => handleDragStart("tension", idx)}
                      onDragOver={e => handleDragOver(e, idx)} onDrop={() => handleDrop("tension", idx)}
                      style={{ borderRadius: "4px", border: dragOverIdx === idx && dragItemType === "tension" ? `2px solid ${DM.yellow}` : `1px solid ${DM.grey200}`, background: DM.white, cursor: "grab", transition: "border 0.15s" }}>
                      {/* Collapsed header - always visible */}
                      <div onClick={() => setExpandedTension(isExpanded ? null : t.id)}
                        style={{ padding: "18px 24px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: "16px" }}>
                        <span style={{ fontFamily: "'Anton'", fontSize: "24px", color: DM.red, lineHeight: 1, flexShrink: 0 }}>{String(t.rank).padStart(2, "0")}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                            <EditableText value={t.forceA} onChange={v => updateTension(t.id, "forceA", v)} style={{ fontSize: "14px", fontWeight: 600, fontFamily: "'Poppins'" }} />
                            <span style={{ color: DM.grey400 }}>{"\u2194"}</span>
                            <EditableText value={t.forceB} onChange={v => updateTension(t.id, "forceB", v)} style={{ fontSize: "14px", fontWeight: 600, fontFamily: "'Poppins'" }} />
                          </div>
                          <EditableText value={t.summary} onChange={v => updateTension(t.id, "summary", v)} multiline style={{ fontSize: "12px", fontWeight: 300, color: DM.grey600, lineHeight: 1.65, fontFamily: "'Poppins'" }} />
                        </div>
                        <span style={{ fontSize: "16px", color: DM.grey400, transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0, marginTop: "4px" }}>{"\u25BE"}</span>
                      </div>
                      {/* Expanded detail */}
                      {isExpanded && (
                        <div style={{ padding: "0 24px 20px", paddingLeft: "64px", animation: "fadeUp 0.2s ease-out" }}>
                          <div style={{ marginBottom: "10px" }}>
                            <span style={{ fontSize: "9px", fontWeight: 600, color: DM.grey400, textTransform: "uppercase", letterSpacing: "0.05em" }}>Significance</span>
                            <EditableText value={t.significance} onChange={v => updateTension(t.id, "significance", v)} multiline style={{ fontSize: "11px", fontWeight: 300, color: DM.grey600, lineHeight: 1.6, fontFamily: "'Poppins'" }} />
                          </div>
                          <div style={{ marginBottom: "10px" }}>
                            <span style={{ fontSize: "9px", fontWeight: 600, color: DM.grey400, textTransform: "uppercase", letterSpacing: "0.05em" }}>Category relevance</span>
                            <EditableText value={t.categoryRelevance} onChange={v => updateTension(t.id, "categoryRelevance", v)} multiline style={{ fontSize: "11px", fontWeight: 300, color: DM.grey600, lineHeight: 1.6, fontFamily: "'Poppins'" }} />
                          </div>
                          <div style={{ padding: "12px 16px", borderRadius: "4px", background: "#FFF9DB", borderLeft: `3px solid ${DM.red}` }}>
                            <span style={{ fontSize: "9px", fontWeight: 600, color: DM.red, textTransform: "uppercase", letterSpacing: "0.05em" }}>Strategic question</span>
                            <EditableText value={t.strategicQuestion} onChange={v => updateTension(t.id, "strategicQuestion", v)} multiline style={{ fontSize: "12px", fontWeight: 400, color: DM.grey600, lineHeight: 1.6, fontStyle: "italic", fontFamily: "'Poppins'" }} />
                          </div>
                          {t.evidence?.length > 0 && (
                            <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
                              {t.evidence.map((ev, i) => (
                                <div key={i} style={{ padding: "8px 12px", background: DM.grey50, borderRadius: "4px", borderLeft: `2px solid ${DM.grey200}` }}>
                                  <p style={{ fontSize: "11px", fontStyle: "italic", color: DM.nearBlack, lineHeight: 1.5 }}>{"\u201C"}{ev.text}{"\u201D"}</p>
                                  <span style={{ fontSize: "9px", color: DM.grey400 }}>{ev.source}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );})}
                </div>
              </div>
            </div>
          )}

          {/* ─── PROVOCATIONS TAB ─── */}
          {activeView === "provocations" && (
            <div style={{ flex: 1, overflowY: "auto", padding: "40px" }}>
              <div style={{ maxWidth: "780px", margin: "0 auto", animation: "fadeUp 0.4s ease-out" }}>
                <SectionLabel>Provocations for fieldwork</SectionLabel>
                <h2 style={{ fontFamily: "'Anton'", fontSize: "28px", lineHeight: 1.1, marginBottom: "6px" }}>{allProvocations.length} provocations</h2>
                <p style={{ fontSize: "12px", fontWeight: 300, color: DM.grey600, lineHeight: 1.65, marginBottom: "12px" }}>Grounded in interview evidence. Framed to provoke reaction from research participants. Drag to reorder, click to edit.</p>
                {/* AI Generate bar */}
                <div style={{ marginBottom: "24px", padding: "16px 20px", borderRadius: "4px", background: DM.nearBlack, border: `1px solid ${DM.yellow}30` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: DM.yellow }} />
                    <span style={{ fontFamily: "'Space Mono'", fontSize: "9px", color: DM.yellow }}>AI Generate</span>
                    <span style={{ fontSize: "10px", fontWeight: 300, color: "rgba(255,255,255,0.4)" }}>{"\u2014"} describe what you want to provoke</span>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input value={provPrompt} onChange={e => setProvPrompt(e.target.value)} onKeyDown={e => e.key === "Enter" && generateProvocation()}
                      placeholder={'e.g. "A provocation about digital trust for Gen Z" \u2022 "Something about heritage vs. innovation"'}
                      style={{ flex: 1, padding: "10px 14px", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", fontFamily: "'Poppins'", fontSize: "12px", color: DM.white, background: "rgba(255,255,255,0.06)", outline: "none" }} />
                    <button onClick={generateProvocation} disabled={!provPrompt.trim() || provGenerating}
                      style={{ padding: "10px 20px", border: "none", borderRadius: "4px", background: provPrompt.trim() && !provGenerating ? DM.yellow : "rgba(255,255,255,0.1)", color: provPrompt.trim() && !provGenerating ? DM.black : "rgba(255,255,255,0.3)", fontFamily: "'Poppins'", fontSize: "11px", fontWeight: 600, cursor: provPrompt.trim() && !provGenerating ? "pointer" : "default", whiteSpace: "nowrap" }}>
                      {provGenerating ? "Generating..." : "Generate \u2192"}
                    </button>
                  </div>
                  {provError && <p style={{ color: "#FF6B6B", fontSize: "10px", marginTop: "6px" }}>{provError}</p>}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {allProvocations.map((p, idx) => {
                    const tension = allTensions.find(t => t.id === p.tensionId);
                    return (
                      <div key={p.id} draggable onDragStart={() => handleDragStart("provocation", idx)}
                        onDragOver={e => handleDragOver(e, idx)} onDrop={() => handleDrop("provocation", idx)}
                        style={{ padding: "18px 22px", borderRadius: "4px", border: dragOverIdx === idx && dragItemType === "provocation" ? `2px solid ${DM.yellow}` : `1px solid ${DM.grey200}`, background: DM.white, cursor: "grab" }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "8px" }}>
                          {tension && <TensionPill rank={tension.rank} />}
                          {p._generated && <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.yellow, background: "#FFF9DB", padding: "2px 6px", borderRadius: "3px" }}>AI</span>}
                          <div style={{ flex: 1 }}>
                            <EditableText value={p.title} onChange={v => updateProvocation(p.id, "title", v)} style={{ fontSize: "14px", fontWeight: 600, lineHeight: 1.4, fontFamily: "'Poppins'" }} />
                          </div>
                        </div>
                        <div style={{ paddingLeft: "0" }}>
                          <EditableText value={p.text} onChange={v => updateProvocation(p.id, "text", v)} multiline style={{ fontSize: "12px", fontWeight: 300, color: DM.grey600, lineHeight: 1.65, marginBottom: "8px", fontFamily: "'Poppins'" }} />
                          <div style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                            <span style={{ fontSize: "10px", fontWeight: 500, color: DM.grey400, flexShrink: 0 }}>Evidence:</span>
                            <EditableText value={p.evidence} onChange={v => updateProvocation(p.id, "evidence", v)} style={{ fontSize: "10px", fontWeight: 300, color: DM.grey400, lineHeight: 1.5, fontFamily: "'Poppins'" }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button onClick={() => {
                  const newId = Math.max(0, ...allProvocations.map(p => p.id)) + 1;
                  setAllProvocations(prev => [...prev, { id: newId, tensionId: allTensions[0]?.id || 1, title: "New provocation question?", text: "Description...", evidence: "Source..." }]);
                }} style={{ marginTop: "16px", width: "100%", padding: "12px", border: `1.5px dashed ${DM.grey200}`, borderRadius: "4px", background: "transparent", color: DM.grey400, fontFamily: "'Poppins'", fontSize: "12px", cursor: "pointer" }}>+ Add provocation manually</button>
              </div>
            </div>
          )}

          {/* ─── STRATEGIC NARRATIVE TAB ─── */}
          {activeView === "narrative" && (
            <div style={{ flex: 1, overflowY: "auto", padding: "40px" }}>
              <div style={{ maxWidth: "780px", margin: "0 auto", animation: "fadeUp 0.4s ease-out" }}>
                {/* AI Refine */}
                <div style={{ marginBottom: "28px", padding: "16px 20px", borderRadius: "4px", background: DM.nearBlack, border: `1px solid ${DM.yellow}30` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: DM.yellow }} />
                    <span style={{ fontFamily: "'Space Mono'", fontSize: "9px", color: DM.yellow }}>AI Refine</span>
                    <span style={{ fontSize: "10px", fontWeight: 300, color: "rgba(255,255,255,0.4)" }}>{"\u2014"} describe how you want the narrative changed</span>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input value={refinePrompt} onChange={e => setRefinePrompt(e.target.value)} onKeyDown={e => e.key === "Enter" && refineNarrative()}
                      placeholder={'e.g. "Make it more provocative" \u2022 "Reframe for a CMO audience"'}
                      style={{ flex: 1, padding: "10px 14px", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", fontFamily: "'Poppins'", fontSize: "12px", color: DM.white, background: "rgba(255,255,255,0.06)", outline: "none" }} />
                    <button onClick={refineNarrative} disabled={!refinePrompt.trim() || refining}
                      style={{ padding: "10px 20px", border: "none", borderRadius: "4px", background: refinePrompt.trim() && !refining ? DM.yellow : "rgba(255,255,255,0.1)", color: refinePrompt.trim() && !refining ? DM.black : "rgba(255,255,255,0.3)", fontFamily: "'Poppins'", fontSize: "11px", fontWeight: 600, cursor: refinePrompt.trim() && !refining ? "pointer" : "default", whiteSpace: "nowrap" }}>
                      {refining ? "Refining..." : "Refine \u2192"}
                    </button>
                  </div>
                  {refineError && <p style={{ color: "#FF6B6B", fontSize: "10px", marginTop: "6px" }}>{refineError}</p>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                  <SectionLabel>Strategic narrative</SectionLabel>
                  <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.grey400, background: DM.grey50, padding: "2px 8px", borderRadius: "3px" }}>Lens: {currentAxis.name}</span>
                  {currentAxis._custom && <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.yellow, background: "#FFF9DB", padding: "2px 6px", borderRadius: "3px" }}>Custom</span>}
                  <span style={{ fontSize: "9px", fontWeight: 300, color: DM.grey400, marginLeft: "auto" }}>Click any text to edit directly</span>
                </div>
                {editingField === "headline" ? (
                  <textarea autoFocus value={currentAxis.narrative.headline} onChange={e => updateNarrative("headline", e.target.value)} onBlur={() => setEditingField(null)} onKeyDown={e => e.key === "Escape" && setEditingField(null)}
                    style={{ fontFamily: "'Anton'", fontSize: "30px", color: DM.black, lineHeight: 1.15, marginBottom: "28px", width: "100%", border: `2px solid ${DM.yellow}`, borderRadius: "4px", padding: "8px 12px", background: "#FFFCE8", resize: "vertical", outline: "none" }} />
                ) : (
                  <h2 onClick={() => setEditingField("headline")} style={{ fontFamily: "'Anton'", fontSize: "30px", lineHeight: 1.15, marginBottom: "28px", maxWidth: "620px", cursor: "text", borderRadius: "4px", padding: "8px 12px", margin: "-8px -12px 20px", transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#FFFCE808"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    {currentAxis.narrative.headline}
                  </h2>
                )}
                {editingField === "summary" ? (
                  <textarea autoFocus value={currentAxis.narrative.summary} onChange={e => updateNarrative("summary", e.target.value)} onBlur={() => setEditingField(null)} onKeyDown={e => e.key === "Escape" && setEditingField(null)} rows={16}
                    style={{ width: "100%", fontSize: "13px", fontWeight: 300, color: DM.grey600, lineHeight: 1.75, fontFamily: "'Poppins'", border: `2px solid ${DM.yellow}`, borderRadius: "4px", padding: "16px", background: "#FFFCE8", resize: "vertical", outline: "none", marginBottom: "32px" }} />
                ) : (
                  <div onClick={() => setEditingField("summary")} style={{ columnCount: 2, columnGap: "32px", marginBottom: "32px", cursor: "text", borderRadius: "4px", padding: "12px 16px", margin: "-12px -16px 20px", transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#FFFCE808"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    {currentAxis.narrative.summary.split("\n\n").map((para, i) => (
                      <p key={i} style={{ fontSize: "13px", fontWeight: 300, color: DM.grey600, lineHeight: 1.75, marginBottom: "16px", breakInside: "avoid" }}>{para}</p>
                    ))}
                  </div>
                )}
                <div style={{ padding: "20px 24px", borderRadius: "4px", background: "#FFF9DB", borderLeft: `3px solid ${DM.yellow}`, marginBottom: "36px" }}>
                  <div style={{ fontSize: "10px", fontWeight: 600, marginBottom: "8px" }}>Key strategic tension</div>
                  {editingField === "keyTension" ? (
                    <textarea autoFocus value={currentAxis.narrative.keyTension} onChange={e => updateNarrative("keyTension", e.target.value)} onBlur={() => setEditingField(null)} onKeyDown={e => e.key === "Escape" && setEditingField(null)} rows={3}
                      style={{ width: "100%", fontSize: "14px", fontWeight: 400, color: DM.grey600, lineHeight: 1.7, fontFamily: "'Poppins'", border: `2px solid ${DM.yellow}`, borderRadius: "4px", padding: "8px 12px", background: DM.white, resize: "vertical", outline: "none" }} />
                  ) : (
                    <p onClick={() => setEditingField("keyTension")} style={{ fontSize: "14px", fontWeight: 400, color: DM.grey600, lineHeight: 1.7, cursor: "text", borderRadius: "4px", padding: "4px 8px", margin: "-4px -8px", transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.5)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      {currentAxis.narrative.keyTension}
                    </p>
                  )}
                </div>
                {/* Truth salience bars */}
                <SectionLabel>Truth salience</SectionLabel>
                <div style={{ padding: "22px", borderRadius: "4px", background: DM.grey50 }}>
                  {[...truths].sort((a, b) => b.salience - a.salience).map((n, i) => {
                    const qk = getQ(n.x, n.y ?? 0.5);
                    return (
                      <div key={n.id} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "7px 0", borderBottom: i < truths.length - 1 ? `1px solid ${DM.grey100}` : "none" }}>
                        <span style={{ fontFamily: "'Space Mono'", fontSize: "9px", color: DM.grey200, width: "16px", textAlign: "right" }}>{i + 1}</span>
                        <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: Q_COLORS[qk] }} />
                        <span style={{ fontSize: "12px", fontWeight: 500, width: "160px" }}>{n.name}</span>
                        <div style={{ flex: 1, height: "3px", background: DM.grey100, borderRadius: "2px" }}><div style={{ width: `${n.salience}%`, height: "100%", background: Q_COLORS[qk], opacity: 0.5, borderRadius: "2px" }} /></div>
                        <span style={{ fontFamily: "'Space Mono'", fontSize: "10px", color: DM.grey600, width: "32px", textAlign: "right" }}>{n.salience}%</span>
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop: "48px", paddingTop: "20px", borderTop: `1px solid ${DM.grey100}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <DmLogo height={14} />
                  <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.grey400 }}>Human Truth Analysis {"\u00B7"} Confidential</span>
                </div>
              </div>
            </div>
          )}

          {/* ─── SOURCES TAB ─── */}
          {activeView === "participants" && (
            <div style={{ flex: 1, overflowY: "auto", padding: "40px" }}>
              <div style={{ maxWidth: "780px", margin: "0 auto", animation: "fadeUp 0.4s ease-out" }}>
                <SectionLabel>Participant registry</SectionLabel>
                <h2 style={{ fontFamily: "'Anton'", fontSize: "28px", lineHeight: 1.1, marginBottom: "6px" }}>{allParticipants.length} participants</h2>
                {meta?.corpusNotes && <p style={{ fontSize: "12px", fontWeight: 300, color: DM.grey600, lineHeight: 1.65, marginBottom: "24px" }}>{meta.corpusNotes}</p>}
                {(() => {
                  const grouped = {};
                  allParticipants.forEach(p => { const seg = p.segment || p.type || "Other"; if (!grouped[seg]) grouped[seg] = []; grouped[seg].push(p); });
                  return Object.entries(grouped).map(([seg, participants]) => (
                    <div key={seg} style={{ marginBottom: "20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingBottom: "8px", borderBottom: `1px solid ${DM.grey100}`, marginBottom: "8px" }}>
                        <span style={{ fontFamily: "'Space Mono'", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: DM.grey600 }}>{seg}</span>
                        <span style={{ fontFamily: "'Space Mono'", fontSize: "9px", color: DM.grey400 }}>({participants.length})</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        {participants.map(p => (
                          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "4px", background: DM.grey50 }}>
                            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: DM.yellow, display: "grid", placeItems: "center", flexShrink: 0 }}>
                              <span style={{ fontFamily: "'Anton'", fontSize: "11px", color: DM.black }}>{(p.pseudonym || p.id || "?")[0]}</span>
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <span style={{ fontSize: "12px", fontWeight: 600, color: DM.nearBlack }}>{p.pseudonym || p.title || p.id}</span>
                              <div style={{ fontSize: "9px", color: DM.grey400, marginTop: "2px" }}>{p.demographics || [p.author, p.date, p.market].filter(Boolean).join(" \u00B7 ")}</div>
                            </div>
                            {p.market && <MarketPill market={p.market} />}
                          </div>
                        ))}
                      </div>
                    </div>
                  ));
                })()}
                {/* Known Gaps - collapsed */}
                {meta?.gaps?.length > 0 && (
                  <div style={{ marginTop: "40px", borderTop: `1px solid ${DM.grey100}`, paddingTop: "20px" }}>
                    <button onClick={() => setShowGaps(!showGaps)} style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                      <span style={{ fontFamily: "'Space Mono'", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: DM.grey400 }}>Known gaps</span>
                      {!showGaps && <span style={{ fontSize: "9px", fontStyle: "italic", color: DM.grey400, opacity: 0.7 }}>click to expand</span>}
                      <span style={{ fontSize: "14px", color: DM.grey400, transform: showGaps ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>{"\u25BE"}</span>
                    </button>
                    {showGaps && (
                      <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
                        {meta.gaps.map((gap, i) => (
                          <div key={i} style={{ padding: "8px 12px", background: DM.grey50, borderRadius: "4px", borderLeft: `2px solid ${DM.grey200}`, fontSize: "11px", fontWeight: 300, color: DM.grey600, lineHeight: 1.5 }}>{gap}</div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <div style={{ marginTop: "48px", paddingTop: "20px", borderTop: `1px solid ${DM.grey100}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <DmLogo height={14} />
                  <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.grey400 }}>Human Truth Analysis {"\u00B7"} {meta?.client} {"\u00B7"} {meta?.territory}</span>
                </div>
              </div>
            </div>
          )}

          {/* ─── NOTES TAB ─── */}
          {activeView === "notes" && (
            <div style={{ flex: 1, overflowY: "auto", padding: "40px" }}>
              <div style={{ maxWidth: "780px", margin: "0 auto", animation: "fadeUp 0.4s ease-out" }}>

                {/* Header row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "28px" }}>
                  <div>
                    <SectionLabel>Analysis notes</SectionLabel>
                    <h2 style={{ fontFamily: "'Anton'", fontSize: "28px", lineHeight: 1.1, marginBottom: "6px" }}>{notes.length} {notes.length === 1 ? "note" : "notes"}</h2>
                    <p style={{ fontSize: "12px", fontWeight: 300, color: DM.grey600, lineHeight: 1.65 }}>Observations captured while exploring. Auto-saved to your browser. Export to share with collaborators.</p>
                  </div>
                  <div style={{ display: "flex", gap: "6px", flexShrink: 0, marginTop: "4px" }}>
                    <button onClick={() => importFileRef.current?.click()} style={{ padding: "7px 12px", border: `1px solid ${DM.grey200}`, borderRadius: "4px", background: "transparent", fontFamily: "'Space Mono'", fontSize: "8px", color: DM.grey400, cursor: "pointer" }}>↑ Import</button>
                    <button onClick={exportAnnotations} style={{ padding: "7px 12px", border: `1px solid ${DM.grey200}`, borderRadius: "4px", background: "transparent", fontFamily: "'Space Mono'", fontSize: "8px", color: DM.grey400, cursor: "pointer" }}>↓ Export</button>
                  </div>
                </div>

                {importError && (
                  <div style={{ marginBottom: "16px", padding: "10px 14px", borderRadius: "4px", background: importError.startsWith("Import failed") ? "#FFF0F0" : "#F0FFF4", border: `1px solid ${importError.startsWith("Import failed") ? "#FFCCCC" : "#B2F5C8"}`, fontSize: "11px", color: importError.startsWith("Import failed") ? DM.red : "#2A8C51" }}>
                    {importError}
                    <button onClick={() => setImportError("")} style={{ marginLeft: "8px", background: "none", border: "none", cursor: "pointer", fontSize: "11px", color: "inherit", opacity: 0.6 }}>✕</button>
                  </div>
                )}

                {/* Quick-add composer */}
                <div style={{ marginBottom: "28px", padding: "16px 18px", borderRadius: "6px", border: `1.5px dashed ${DM.grey200}`, background: DM.grey50 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    {userInitials && <span style={{ fontFamily: "'Anton'", fontSize: "10px", color: DM.white, background: DM.black, padding: "2px 7px", borderRadius: "3px" }}>{userInitials}</span>}
                    <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.grey400, letterSpacing: "0.06em" }}>NEW NOTE</span>
                  </div>
                  <textarea
                    value={quickNoteText}
                    onChange={e => setQuickNoteText(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { if (quickNoteText.trim()) { addNote(quickNoteText, null); setQuickNoteText(""); } } }}
                    placeholder="Type an observation… ⌘↵ to save"
                    rows={2}
                    style={{ width: "100%", padding: "10px 12px", border: `1px solid ${DM.grey100}`, borderRadius: "4px", fontFamily: "'Poppins'", fontSize: "12px", fontWeight: 300, color: DM.nearBlack, resize: "none", outline: "none", lineHeight: 1.6, background: DM.white }}
                  />
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                    <button onClick={() => { if (quickNoteText.trim()) { addNote(quickNoteText, null); setQuickNoteText(""); } }} disabled={!quickNoteText.trim()} style={{ padding: "7px 16px", border: "none", borderRadius: "4px", background: quickNoteText.trim() ? DM.yellow : DM.grey100, color: quickNoteText.trim() ? DM.black : DM.grey400, fontFamily: "'Poppins'", fontSize: "11px", fontWeight: 600, cursor: quickNoteText.trim() ? "pointer" : "default" }}>Save note</button>
                  </div>
                </div>

                {/* Notes list */}
                {notes.length === 0 ? (
                  <div style={{ padding: "48px 40px", textAlign: "center", color: DM.grey400, borderRadius: "6px", border: `1px solid ${DM.grey100}` }}>
                    <div style={{ fontSize: "28px", marginBottom: "10px", opacity: 0.2 }}>✏</div>
                    <p style={{ fontSize: "13px", fontWeight: 300 }}>No notes yet</p>
                    <p style={{ fontSize: "10px", fontWeight: 300, marginTop: "4px" }}>Use the Map tab to capture observations as you explore</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {notes.map(note => {
                      const linkedTruth = note.linkedTruthId ? truths.find(t => t.id === note.linkedTruthId) : null;
                      const qk = linkedTruth ? getQ(linkedTruth.x, linkedTruth.y ?? 0.5) : null;
                      const isOwn = !note.author || note.author === userInitials || note.author === "?";
                      return (
                        <div key={note.id} style={{ padding: "16px 20px", borderRadius: "6px", background: DM.white, border: `1px solid ${isOwn ? DM.grey100 : DM.yellow + "40"}`, transition: "border-color 0.15s" }}
                          onMouseEnter={e => e.currentTarget.style.borderColor = isOwn ? DM.grey200 : DM.yellow}
                          onMouseLeave={e => e.currentTarget.style.borderColor = isOwn ? DM.grey100 : DM.yellow + "40"}>
                          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
                            <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
                              {note.author && note.author !== "?" && (
                                <span style={{ fontFamily: "'Anton'", fontSize: "9px", color: isOwn ? DM.white : DM.black, background: isOwn ? DM.black : DM.yellow, padding: "2px 7px", borderRadius: "3px" }}>{note.author}</span>
                              )}
                              <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.grey400 }}>{note.timestamp}</span>
                              {note.axis && <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.grey400, background: DM.grey50, padding: "2px 7px", borderRadius: "3px", border: `1px solid ${DM.grey100}` }}>{note.axis}</span>}
                              {linkedTruth && (
                                <button onClick={() => { setSelectedTruth(linkedTruth); setActiveView("map"); setSelectedQuadrant(null); }} style={{ display: "flex", alignItems: "center", gap: "4px", padding: "2px 8px", border: "none", borderRadius: "3px", background: qk ? `${Q_COLORS[qk]}15` : DM.grey50, color: qk ? Q_COLORS[qk] : DM.grey600, fontFamily: "'Space Mono'", fontSize: "8px", cursor: "pointer" }}>
                                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: qk ? Q_COLORS[qk] : DM.grey400 }} />
                                  {linkedTruth.name}
                                </button>
                              )}
                            </div>
                            <button onClick={() => setNotes(prev => prev.filter(n => n.id !== note.id))} style={{ background: "none", border: "none", color: DM.grey200, cursor: "pointer", fontSize: "14px", lineHeight: 1, flexShrink: 0, padding: "0 2px", transition: "color 0.15s" }}
                              onMouseEnter={e => e.currentTarget.style.color = DM.red}
                              onMouseLeave={e => e.currentTarget.style.color = DM.grey200}>{"\u2715"}</button>
                          </div>
                          <p style={{ fontSize: "13px", fontWeight: 300, color: DM.nearBlack, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{note.text}</p>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div style={{ marginTop: "48px", paddingTop: "20px", borderTop: `1px solid ${DM.grey100}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <DmLogo height={14} />
                  <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.grey400 }}>Human Truth Analysis {"\u00B7"} Confidential</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </>)}
    </div>
  );
}

export default HumanTruthExplorer;
