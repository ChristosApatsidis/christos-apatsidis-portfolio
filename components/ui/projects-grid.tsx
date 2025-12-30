import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";
// Next.js
import { useRouter } from 'next/navigation';

/**
 * ProjectsGrid Component
 */
export const ProjectsGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

/**
 * ProjectsGridItem Component
 */
export const ProjectsGridItem = ({
  className,
  project
}: {
  className?: string;
  project: {
    title: string;
    description: string;
    header: {
      image?: {
        src: string;
        width: number;
        height: number;
        alt: string;
      };
      gradient?: string;
    };
    icons?: React.ReactNode;
    urls?: {
      live?: {
        href: string;
        label: string;
        icon: React.ReactNode;
      }
      github?: {
        href: string;
        label: string;
        icon: React.ReactNode;
      },
    };
    url: string;
  };
}) => {
  const router = useRouter();

  const { title, description, header, icons, urls, url } = project;

  return (
    <div
      className={cn(
        "relative rounded-xl row-span-1 flex h-full flex-col p-4 border border-black/[0.1] dark:border-white/[0.2] bg-white/20 dark:bg-black/20 backdrop-blur-lg shadow-input cursor-pointer hover:scale-[1.01] transition-transform",
        className,
      )}
      onClick={() => router.push(url)}
    >
      {/* Glowing Effect */}
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={2}
      />

      <div>
        {/* Header Section */}
        <div className="space-y-2">
          {/* Image and Gradient Header */}
          {header?.gradient || header?.image ? (
            <div className={`rounded-lg p-[0.1rem] flex justify-center items-center bg-gradient-to-br ${header?.gradient} min-h-[10rem] w-full`}>
              {header?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={header.image.src}
                  width={header.image.width}
                  height={header.image.height}
                  alt={header.image.alt}
                  className="object-contain rounded-lg"
                />
              ) : null}
            </div>
          ) : null}
          {/* Title */}
          <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200">
            {title}
          </div>

        </div>

        {/* Icons */}
        <div className="mt-1 flex gap-2 text-neutral-600 dark:text-neutral-400">
          {icons}
        </div>

        {/* Links and Description */}
        <div className="space-y-1 mt-1">
          <div>
            {urls?.live ? (
              <a
                href={urls.live.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                {urls.live.icon}
                {urls.live.label}
              </a>
            ) : null}
            {urls?.github ? (
              <a
                href={urls.github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:underline dark:text-gray-400 ml-4"
              >
                {urls.github.icon}
                {urls.github.label}
              </a>
            ) : null}
          </div>
          <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
            {description}
          </div>
        </div>

      </div>
    </div>
  );
};
