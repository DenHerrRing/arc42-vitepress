import {withMermaid} from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid({
    title: "arc42 vitepress",
    description: "An arc42 Template with introductions",
    base: "/arc42-vitepress/",
    mermaid: {
        // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
    },
    // @ts-ignore
    mermaidPlugin: {
        class: "mermaid my-class", // set additional css classes for parent container
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'Home', link: '/'},
            {text: 'English', link: '/arc42/english/01_introduction_and_goals'},
            {text: 'German', link: '/arc42/german/01_introduction_and_goals'}
        ],


        sidebar: {
            "/arc42/english/": [
                {text: '01 Introduction and Goals', link: '/arc42/english/01_introduction_and_goals'},
                {text: '02 Architecture Constraints', link: '/arc42/english/02_architecture_constraints'},
                {text: '03 System Scope and Context', link: '/arc42/english/03_system_scope_and_context'},
                {text: '04 Solution Strategy', link: '/arc42/english/04_solution_strategy'},
                {text: '05 Building Block View', link: '/arc42/english/05_building_block_view'},
                {text: '06 Runtime View', link: '/arc42/english/06_runtime_view'},
                {text: '07 Deployment View', link: '/arc42/english/07_deployment_view'},
                {text: '08 Concepts', link: '/arc42/english/08_concepts'},
                {text: '09 Architecture Decisions', link: '/arc42/english/09_architecture_decisions'},
                {text: '10 Quality Requirements', link: '/arc42/english/10_quality_requirements'},
                {text: '11 Technical Risks', link: '/arc42/english/11_technical_risks'},
                {text: '12 Glossary', link: '/arc42/english/12_glossary'},
                {text: 'About ard42', link: '/arc42/english/about-arc42'},
                {text: 'Arc42 Template', link: '/arc42/english/arc42-template'}
            ],
            "/arc42/german/": [
                {text: '01 Einführung und Ziele', link: '/arc42/german/01_introduction_and_goals'},
                {text: '02 Randbedingungen', link: '/arc42/german/02_architecture_constraints'},
                {text: '03 Kontextabgrenzung', link: '/arc42/german/03_system_scope_and_context'},
                {text: '04 Lösungsstrategie', link: '/arc42/german/04_solution_strategy'},
                {text: '05 Bausteinsicht', link: '/arc42/german/05_building_block_view'},
                {text: '06 Laufzeitsicht', link: '/arc42/german/06_runtime_view'},
                {text: '07 Verteilungssicht', link: '/arc42/german/07_deployment_view'},
                {text: '08 Querschnittliche Konzepte', link: '/arc42/german/08_concepts'},
                {text: '09 Architekturentscheidungen', link: '/arc42/german/09_architecture_decisions'},
                {text: '10 Qualitätsanforderungen', link: '/arc42/german/10_quality_requirements'},
                {text: '11 Risiken und technische Schulden', link: '/arc42/german/11_technical_risks'},
                {text: '12 Glossar', link: '/arc42/german/12_glossary'},
                {text: 'Über arc42', link: '/arc42/german/about-arc42'},
                {text: 'Arc42 Template', link: '/arc42/german/arc42-template'}
            ],
        },
        socialLinks: [
            {icon: 'github', link: 'https://denherrring.github.io/arc42-vitepress/'}
        ]
    }
})
