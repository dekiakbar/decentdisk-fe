import MainLayout from "@/components/web/main-layout";
import { Accordion } from "flowbite-react";

interface Faq {
  title: string;
  content: string;
}

interface FaqProps {
  data: Faq[];
}

export default function Faq() {
  const data = [
    {
      title: "How does the Free Decentralized Storage on this website work?",
      content:
        "Our website leverages decentralized storage technology, spreading your data across a network of nodes. This ensures enhanced security, reliability, and accessibility while providing the service to users at no cost.",
    },
    {
      title: "How much storage space is provided for free?",
      content:
        "The amount of free storage space may vary, and it is typically generous. Check the website or your account dashboard for specific details about the free storage quota.",
    },
    {
      title: "How do I access my files stored in the decentralized network?",
      content:
        "Accessing your files is easy. Log in to your account on our website, and you'll have a user-friendly interface to manage and retrieve your stored data.",
    },
    {
      title:
        "Is there a file size limit for uploads to the decentralized storage?",
      content:
        "File size limits may vary, but typically decentralized storage platforms support large file uploads. Refer to the website's documentation or support for specific details on file size limits.",
    },
    {
      title: "Are there any restrictions on the types of files I can store?",
      content:
        "In most cases, you can store a wide range of file types. However, check the website's terms of service for any specific restrictions on file types.",
    },
    {
      title:
        "How can I get support if I have issues with the decentralized storage service?",
      content:
        "If you encounter any issues or have questions, our support team is here to help. Contact us through the support channels provided on the website.",
    },
  ];

  return (
    <MainLayout>
      <section className="relative z-20 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
                <span className="mb-2 block text-lg font-semibold text-primary">
                  FAQ
                </span>
                <h2 className="mb-4 text-3xl font-bold text-dark sm:text-[40px]/[48px]">
                  Any Questions? Look Here
                </h2>
                <p className="text-base text-body-color dark:text-dark-6">
                  There are many variations of passages of Lorem Ipsum available
                  but the majority have suffered alteration in some form.
                </p>
              </div>
            </div>
          </div>

          <FaqLayout data={data} />
        </div>

        <div className="absolute bottom-0 right-0 z-[-1] left-0 top-0">
          <svg
            width="3840"
            height="2160"
            viewBox="0 0 3840 2160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              d="M 193.307 -273.321 L 1743 1350 L 1399 1660 C 1400 1661 731.745 983.231 478.513 729.927 C 225.976 477.317 -165.714 85.6993 -165.714 85.6993 L 193.307 -273.321 Z"
              fill="url(#paint0_linear)"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="1308.65"
                y1="1142.58"
                x2="602.827"
                y2="-418.681"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3056D3" stopOpacity="0.26" />
                <stop offset="1" stopColor="#9061f9" stopOpacity="0" />
                <stop offset="1" stopColor="#9061f9" stopOpacity="0.096144" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </MainLayout>
  );
}

const FaqLayout: React.FC<FaqProps> = ({ data }) => {
  const middleIndex = Math.ceil(data.length / 2);
  const firstHalf = data.slice(0, middleIndex);
  const secondHalf = data.slice(middleIndex);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-4">
      <div className="grid">
        {firstHalf.map((item, index) => (
          <Accordion className="my-4" key={index}>
            <Accordion.Panel key={index}>
              <Accordion.Title>{item.title}</Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  {item.content}
                </p>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        ))}
      </div>
      <div className="grid">
        {secondHalf.map((item, index) => (
          <Accordion className="my-4" key={index}>
            <Accordion.Panel key={index}>
              <Accordion.Title>{item.title}</Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  {item.content}
                </p>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        ))}
      </div>
    </div>
  );
};
