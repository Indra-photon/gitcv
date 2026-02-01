import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer'

interface Project {
    repo_name: string
    repo_url: string
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
        alignItems: 'baseline',
        marginBottom: 4,
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
