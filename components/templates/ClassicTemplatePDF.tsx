import { Document, Page, Text, View, StyleSheet, Link, Svg, Path } from '@react-pdf/renderer'

interface Project {
    repo_name: string
    repo_url: string
    live_url?: string
    description: string
    bullets: string[]
    technologies: string[]
}

interface Skills {
    frontend?: string[]
    backend?: string[]
    databases?: string[]
    tools?: string[]
    other?: string[]
}

interface ClassicTemplatePDFProps {
    content: {
        projects: Project[]
        skills: Skills
        problems_solved: string[]
    }
    role: string
    userData?: any
}

// Create styles for PDF
const styles = StyleSheet.create({
    page: {
        padding: 48,
        fontFamily: 'Helvetica',
        fontSize: 10,
        lineHeight: 1.6,
    },
    header: {
        marginBottom: 24,
        borderBottom: '2 solid #000',
        paddingBottom: 16,
    },
    name: {
        fontSize: 24,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 8,
    },
    contactInfo: {
        fontSize: 9,
        color: '#666',
        marginBottom: 4,
    },
    links: {
        fontSize: 9,
        color: '#2563eb',
        marginTop: 4,
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    projectItem: {
        marginBottom: 12,
    },
    projectHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 2,
    },
    projectName: {
        fontSize: 14,
        fontFamily: 'Helvetica-Bold',
    },
    technologies: {
        fontSize: 9,
        color: '#666',
        fontStyle: 'italic',
    },
    projectLinks: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 4,
    },
    projectLink: {
        fontSize: 8,
        color: '#2563eb',
        textDecoration: 'none',
    },
    description: {
        fontSize: 10,
        color: '#000',
        marginBottom: 4,
    },
    bulletList: {
        marginTop: 4,
    },
    bulletItem: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    bullet: {
        color: '#999',
        marginRight: 8,
    },
    bulletText: {
        flex: 1,
        fontSize: 10,
        color: '#333',
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    skillTag: {
        backgroundColor: '#f5f5f5',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 4,
        fontSize: 9,
        color: '#333',
        marginRight: 8,
        marginBottom: 8,
    },
    workItem: {
        marginBottom: 12,
    },
    workHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 4,
    },
    jobTitle: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
    },
    dateText: {
        fontSize: 9,
        color: '#666',
    },
    company: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        color: '#333',
        marginBottom: 4,
    },
    eduItem: {
        marginBottom: 10,
    },
    eduHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 2,
    },
    degree: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
    },
    school: {
        fontSize: 10,
        color: '#333',
    },
    link: {
        color: '#2563eb',
        textDecoration: 'none',
    },
    separator: {
        marginHorizontal: 4,
    },
})

const formatDate = (dateString: string | null) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

export default function ClassicTemplatePDF({ content, role, userData }: ClassicTemplatePDFProps) {
    const allSkills = [
        ...(content.skills.frontend || []),
        ...(content.skills.backend || []),
        ...(content.skills.databases || []),
        ...(content.skills.tools || []),
        ...(content.skills.other || [])
    ]

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.name}>
                        {userData?.full_name || userData?.github_username || 'Your Name'}
                    </Text>

                    <View style={styles.contactInfo}>
                        <Text>
                            {userData?.professional_headline || `${role.charAt(0).toUpperCase() + role.slice(1)} Developer`}
                            {userData?.location && ` | ${userData.location}`}
                            {userData?.phone && ` | ${userData.phone}`}
                            {userData?.email && ` | ${userData.email}`}
                        </Text>
                    </View>

                    <View style={styles.links}>
                        <Text>
                            {userData?.github_username && `github.com/${userData.github_username}`}
                            {userData?.linkedin_url && userData?.github_username && ' | '}
                            {userData?.linkedin_url && userData.linkedin_url.replace('https://', '').replace('http://', '').replace('www.', '')}
                            {userData?.portfolio_url && (userData?.github_username || userData?.linkedin_url) && ' | '}
                            {userData?.portfolio_url && userData.portfolio_url.replace('https://', '').replace('http://', '').replace('www.', '')}
                        </Text>
                    </View>
                </View>

                {/* Projects */}
                {content.projects.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Projects</Text>
                        {content.projects.map((project, idx) => (
                            <View key={idx} style={styles.projectItem}>
                                <View style={styles.projectHeader}>
                                    <Text style={styles.projectName}>{project.repo_name}</Text>
                                    {project.technologies.length > 0 && (
                                        <Text style={styles.technologies}>
                                            {project.technologies.slice(0, 3).join(', ')}
                                        </Text>
                                    )}
                                    <View style={{ flexDirection: 'row', gap: 6, marginTop: 2 }}>
                                        {project.repo_url && (
                                            <Link src={project.repo_url}>
                                                <Svg width={12} height={12} viewBox="0 0 24 24">
                                                    <Path
                                                        d="M12 2C6.47 2 2 6.47 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"
                                                        fill="#666666"
                                                    />
                                                </Svg>
                                            </Link>
                                        )}
                                        {project.live_url && (
                                            <Link src={project.live_url}>
                                                <Svg width={12} height={12} viewBox="0 0 24 24">
                                                    <Path
                                                        d="M21.5 12a9.5 9.5 0 1 1-9.5-9.5 9.5 9.5 0 0 1 9.5 9.5z"
                                                        stroke="#666666"
                                                        strokeWidth={2}
                                                        fill="none"
                                                    />
                                                    <Path
                                                        d="M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                                                        stroke="#666666"
                                                        strokeWidth={2}
                                                        fill="none"
                                                    />
                                                </Svg>
                                            </Link>
                                        )}
                                    </View>
                                </View>

                                {project.description && (
                                    <Text style={styles.description}>{project.description}</Text>
                                )}

                                {project.bullets.length > 0 && (
                                    <View style={styles.bulletList}>
                                        {project.bullets.map((bullet, bulletIdx) => (
                                            <View key={bulletIdx} style={styles.bulletItem}>
                                                <Text style={styles.bullet}>•</Text>
                                                <Text style={styles.bulletText}>{bullet}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* Problems Solved */}
                {content.problems_solved.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Key Achievements</Text>
                        <View style={styles.bulletList}>
                            {content.problems_solved.map((problem, idx) => (
                                <View key={idx} style={styles.bulletItem}>
                                    <Text style={styles.bullet}>•</Text>
                                    <Text style={styles.bulletText}>{problem}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Skills */}
                {allSkills.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Technical Skills</Text>
                        <View style={styles.skillsContainer}>
                            {allSkills.map((skill, idx) => (
                                <Text key={idx} style={styles.skillTag}>{skill}</Text>
                            ))}
                        </View>
                    </View>
                )}

                {/* Work Experience */}
                {userData?.work_experience && userData.work_experience.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Work Experience</Text>
                        {userData.work_experience.map((work: any, idx: number) => (
                            <View key={idx} style={styles.workItem}>
                                <View style={styles.workHeader}>
                                    <Text style={styles.jobTitle}>{work.job_title || 'Position'}</Text>
                                    <Text style={styles.dateText}>
                                        {work.start_date
                                            ? `${formatDate(work.start_date)} - ${work.end_date ? formatDate(work.end_date) : 'Present'}`
                                            : 'Date'}
                                    </Text>
                                </View>
                                <Text style={styles.company}>{work.company || 'Company Name'}</Text>
                                {work.description && (
                                    <Text style={styles.description}>{work.description}</Text>
                                )}
                                {work.responsibilities && work.responsibilities.length > 0 && (
                                    <View style={styles.bulletList}>
                                        {work.responsibilities.map((resp: string, respIdx: number) => (
                                            <View key={respIdx} style={styles.bulletItem}>
                                                <Text style={styles.bullet}>•</Text>
                                                <Text style={styles.bulletText}>{resp}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* Education */}
                {userData?.education && userData.education.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {userData.education.map((edu: any, idx: number) => (
                            <View key={idx} style={styles.eduItem}>
                                <View style={styles.eduHeader}>
                                    <Text style={styles.degree}>{edu.degree || 'Degree'}</Text>
                                    {(edu.start_year || edu.end_year) && (
                                        <Text style={styles.dateText}>
                                            {edu.start_year && edu.end_year
                                                ? `${edu.start_year} - ${edu.end_year}`
                                                : edu.start_year
                                                    ? `${edu.start_year} - Present`
                                                    : edu.end_year || ''}
                                        </Text>
                                    )}
                                </View>
                                {edu.school && <Text style={styles.school}>{edu.school}</Text>}
                                {edu.gpa && <Text style={styles.dateText}>GPA: {edu.gpa}</Text>}
                            </View>
                        ))}
                    </View>
                )}

                {/* Certifications */}
                {userData?.certifications && userData.certifications.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Certifications</Text>
                        <View style={styles.bulletList}>
                            {userData.certifications.map((cert: any, idx: number) => (
                                <View key={idx} style={styles.bulletItem}>
                                    <Text style={styles.bullet}>•</Text>
                                    <Text style={styles.bulletText}>
                                        {cert.name || cert.title}
                                        {cert.issuer && ` - ${cert.issuer}`}
                                        {cert.year && ` (${cert.year})`}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Languages */}
                {userData?.languages && userData.languages.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Languages</Text>
                        <View style={styles.skillsContainer}>
                            {userData.languages.map((lang: any, idx: number) => (
                                <Text key={idx} style={styles.skillTag}>
                                    {typeof lang === 'string' ? lang : `${lang.name} (${lang.proficiency})`}
                                </Text>
                            ))}
                        </View>
                    </View>
                )}
            </Page>
        </Document>
    )
}
