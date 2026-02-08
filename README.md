# Simple Candidate Management System
## App description
### Views (or Routes)
- Home (/), Postes, Candidatures Par Id (/condidatures/:id), Modifier Candidatures Par Id (/candidatures/:id/edit).
### Components
- Candidat: Shows Candidate Details. takes candidature of type `Candidature`.
- CandidatEdit: The Form in which you can edit Candidate Details.
- SwapTheme: Simple Component to Modify Current Theme.
## Requirement 
- node v24+
- npm v11+
- prettier (optional)
## running locally
- in order to run the mock API you simply need to run 
```shell
npm run api
```
- in order to run the project on dev mode
```shell
npm run dev
```

**notes:**
- the `_page` and `_order` queries don't seem to work, maybe they need to be combined with other queries, I couldn't debug it, since this was my first time using.  ***json-server***.
- removed `start` script because of dependency conflict.
## Showcase Video
[Video Show Case]((https://github.com/chirani/test_technique_sig/blob/main/showcase1.mp4))