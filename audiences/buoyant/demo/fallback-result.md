## 1. Qualification: Spotify as a research candidate

**Status: research candidate only, not a sales-qualified lead.** Nothing here is a verified buying trigger.

| Category | What we can say | Source |
|---|---|---|
| **Historical verified fact** | Spotify described Backstage tooling that combines Kubernetes deployment status across clusters and regions for service owners (March 2021). This shows Kubernetes use and an internal focus on developer experience. It does not show current deployment counts, unmet need or purchasing plans. | S1: https://engineering.atspotify.com/2021/3/designing-a-better-kubernetes-experience-for-developers |
| **Historical verified fact** | Spotify reported an Envoy perimeter failure after a filter-order change, compounded by a heap/Kubernetes memory-limit mismatch (April 16, 2025 outage, report published May 9, 2025). This concerns perimeter traffic. It does not establish a service-mesh gap, and it is not a November 2026 trigger. | S2: https://engineering.atspotify.com/2025/5/incident-report-spotify-outage-on-april-16-2025 |
| **Product context** | Linkerd is a Kubernetes service mesh for observability, reliability and security. | S3: https://linkerd.io/docs/overview/ |
| **Product-fit hypothesis** | Kubernetes use gives possible fit with platform teams that need service-to-service observability, reliability or security. This is a hypothesis, not a finding. | S1 + S3 |
| **Unknown current timing** | Current mesh, initiative, buying stage, budget, named buyer, contact permission and any existing Buoyant relationship are all unknown. | Source pack |

Fit and timing are kept separate. Fit is plausible but unconfirmed. Timing is unknown, and the 2025 incident is not permission to contact anyone.

## 2. Three alternative first-touch drafts (DEMO ONLY)

These are alternatives to review, not a sending sequence. Recipient: **DEMO ONLY – Fictional Spotify Platform Lead**, no real address. Voice is the synthetic training voice.

**Draft 1** (Subject: Kubernetes status across clusters)

> Hi Platform Lead (DEMO ONLY),
>
> In 2021 Spotify Engineering described Backstage tooling that combines Kubernetes deployment status across clusters and regions for service owners. I don't know how that looks today.
>
> How do your teams currently see reliability and security signals for service-to-service traffic?
>
> – Fictional Buoyant rep (DEMO ONLY)

**Draft 2** (Subject: Service owner visibility)

> Hi Platform Lead (DEMO ONLY),
>
> Spotify's 2021 engineering post on Kubernetes tooling for developers described giving service owners one view of deployment status across clusters and regions.
>
> Is there a part of running services on Kubernetes today where owners still lack a clear view? I'm asking to learn, not assuming there is.
>
> – Fictional Buoyant rep (DEMO ONLY)

**Draft 3** (Subject: Service-to-service visibility)

> Hi Platform Lead (DEMO ONLY),
>
> Spotify's 2021 Backstage write-up described Kubernetes status across clusters and regions.
>
> Linkerd is a Kubernetes service mesh for observability, reliability and security.
>
> Is service-to-service visibility something your platform team is currently thinking about, or is that handled elsewhere?
>
> – Fictional Buoyant rep (DEMO ONLY)

## 3. Plain-text review table

This is not the plugin queue. Nothing has been stored or sent, and no legal clearance is claimed.

```
Draft | Words | Source   | Status                  | Basis   | Why-now
------+-------+----------+-------------------------+---------+----------------------------------------
1     | 50    | S1       | PENDING TRAINING REVIEW | UNKNOWN | NO CURRENT BUYING TRIGGER VERIFIED
2     | 58    | S1       | PENDING TRAINING REVIEW | UNKNOWN | NO CURRENT BUYING TRIGGER VERIFIED
3     | 49    | S1 + S3  | PENDING TRAINING REVIEW | UNKNOWN | NO CURRENT BUYING TRIGGER VERIFIED
```

Word counts were corrected by splitting each quoted body on whitespace; they include greeting and sign-off but exclude the subject line. All are under the 80-word limit.

## 4. Discovery question and unknowns

**Recommended discovery question:**
"How do your platform teams currently get visibility into reliability and security between services running on Kubernetes, and what, if anything, is hard about it today?"

It asks about current practice before any architecture is suggested, and it makes no assumption about a mesh, a gap or a trigger.

**Material unknowns to verify before actual outreach:**
- Whether Spotify currently runs any service mesh, and which one.
- Any current platform initiative around observability, reliability or security.
- Buying stage and budget.
- A named, appropriate buyer or owner, and whether contacting them is permitted.
- Any existing Buoyant relationship.
- A real, current, verified why-now signal. None exists in the source pack.
- Whether Buoyant approves the voice and wording, since this one is a synthetic training voice.
- Compliance and contact-permission review, which has not been done.
