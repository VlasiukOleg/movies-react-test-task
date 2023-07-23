import { Section, SectionTitle } from "./Section.styled";

export const  CustomSection = ({ title, children }) => {
    return (
      <Section>
        <SectionTitle>{title}</SectionTitle>
        {children}
      </Section>
    );
  };