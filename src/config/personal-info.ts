import { title } from "process";

export interface WorkHighlight {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export interface TimelineItem {
  period: string;
  title: string;
  role: string;
  description: string;
  isCurrentRole?: boolean;
  highlights?: WorkHighlight[];
  link?: string;
  layout?: {
    highlightsDisplay?: 'grid' | 'list';
    gridColumns?: 1 | 2 | 3 | 4;
    expandOnHover?: boolean;
  };
}

export const personalInfo = {
  name: "Ari von Nordenskjöld",
  currentRole: "AI Software Engineer",
  introduction: "Exploring interesting technologies and building cool stuff",
  layout: {
    preferredDisplay: 'adaptive',
    maxWidth: '1400px',
    breakpoints: {
      mobile: '640px',
      tablet: '768px', 
      desktop: '1024px',
      wide: '1280px'
    }
  },
  social: {
    github: "https://github.com/vnord",
    linkedin: "https://linkedin.com/in/vnord",
    email: "ari@vnord.net"
  },
  timeline: [
    {
      period: "12/2023 - Present",
      title: "Noumena Digital",
      role: "AI Tech Lead",
      description: "Leading the company's generative AI initiatives, focusing on advanced AI solutions and technical leadership.",
      isCurrentRole: true,
      link: "https://noumenadigital.com",
      layout: {
        highlightsDisplay: 'grid',
        gridColumns: 2,
        expandOnHover: true
      },
      highlights: [
        {
          title: "AI Leadership",
          description: "Responsible for generative AI initiatives, including model training, orchestration, evaluation, integration, and deployment.",
          tags: ["Generative AI", "Large Language Models", "LLM Fine-tuning", "Prompt Engineering", "LangChain", "Amazon Bedrock", "Azure AI", "Agentic AI"]
        }
      ]
    },
    {
      period: "02/2021 - Present",
      title: "Noumena Digital",
      role: "Software Engineer",
      description: "Core member of the Platform team, developing the Noumena Protocol Language (NPL) and its ecosystem.",
      link: "https://noumenadigital.com",
      layout: {
        highlightsDisplay: 'grid',
        gridColumns: 2,
        expandOnHover: true
      },
      highlights: [
        {
          title: "Language Development",
          description: "Developed the Noumena Protocol Language (NPL), including compiler, applications, APIs, plugins, tooling, and documentation systems.",
          tags: ["Kotlin", "Software Design", "Compilers", "Jetbrains Plugin Development", "Language Server", "LSP", "Language Development", "Object-Oriented Programming"]
        },
        {
          title: "System Architecture",
          description: "Conceived and built an AMQP notification system to enable scalable work queues. Designed and implemented various APIs for internal and external use.",
          tags: ["System Design", "AMQP", "API Development"]
        },
        {
          title: "Technical Leadership",
          description: "Fundamentally overhauled documentation systems. Led developer outreach and advocacy initiatives. Interviewed and onboarded new team members.",
          tags: ["Documentation", "Developer Relations", "Developer Advocacy", "Coaching"]
        }
      ]
    },
    {
      period: "02/2023 - 02/2024",
      title: "Cabanner",
      role: "Software Lead (part-time)",
      description: "Led development of IoT video control systems.",
      link: "https://cabanner.com",
      highlights: [
        {
          title: "IoT System Architecture",
          description: "Designed and developed system for synchronous video playback and control of a Raspberry Pi Zero cluster over WiFi with MQTT.",
          tags: ["IoT", "MQTT", "Embedded Systems", "Golang"]
        },
        {
          title: "Mobile Development",
          description: "Developed an Android app for controlling the cluster, enabling seamless device management.",
          tags: ["Android", "Kotlin", "Mobile Development", "IoT Control"]
        }
      ]
    },
    {
      period: "09/2015 - 06/2020",
      title: "Chalmers University of Technology",
      role: "Computer Science & Engineering",
      description: "Bachelor's and Master's degrees in Computer Science and Engineering, with a focus on Functional Programming.",
      highlights: [
        {
          title: "M.Sc. Thesis: Ray Tracing for Sensor Simulation",
          description: "Developed a ray tracing system for sensor simulation using parallel functional programming techniques.",
          tags: ["Ray Tracing", "Parallel Programming", "Functional Programming", "Futhark"],
          link: "https://odr.chalmers.se/items/e6169832-f4d6-4d1d-a4db-54b91a99525d"
        },
        {
          title: "B.Sc. Thesis: Port Call Synchronization",
          description: "Developed a system for automating the generation of recommended times of arrival for vessels arriving at ports, based on PortCDM (Port Collaborative Decision Making).",
          tags: ["Maritime Software", "Optimization", "System Design"],
          link: "https://odr.chalmers.se/items/0f455ac9-f8fa-47a3-a7aa-fa946ed10e9a"
        },
        {
          title: "Supplemental Instruction Leader",
          description: "Coached students taking a course in Discrete Mathematics.",
          tags: ["Teaching", "Mentoring"]
        }
      ]
    },
    {
      period: "06/2019 - 08/2019",
      title: "Volvo Cars",
      role: "Software Engineer (Internship)",
      link: "https://www.volvocars.com",
      highlights: [
        {
          title: "Virtual Car Framework Enhancement",
          description: "Extended the Virtual Car testing & verification framework to support additional hardware units for simulation.",
          tags: ["Simulation", "CMake", "Python", "C/C++"]
        }
      ]
    },
    {
      period: "06/2018 - 08/2018",
      title: "RISE",
      role: "Backend Developer",
      link: "https://www.ri.se/en",
      highlights: [
        {
          title: "Event Notification System",
          description: "Designed and implemented a configurable notification system for maritime information sharing.",
          tags: ["Backend Development", "Event Systems", "Maritime Software"]
        }
      ]
    },
    {
      period: "06/2017 - 06/2018",
      title: "Intize",
      role: "Project Manager & Mentor",
      link: "https://intize.org",
      highlights: [
        {
          title: "Mentorship Program Management",
          description: "Coordinated and managed a mentorship program focused on supporting talented youth.",
          tags: ["Project Management", "Education", "Mentorship"]
        },
        {
          title: "Mathematics Mentoring",
          description: "Coached high school students in mathematics and conducted math-related activities with specially talented kids.",
          tags: ["Mathematics", "Teaching", "Mentoring"]
        }
      ]
    }
  ]
};

export const _title = title;