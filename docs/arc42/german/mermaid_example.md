# Mermaid C4 Diagramm Beispiele

Dieses Dokument zeigt verschiedene Beispiele für C4-Diagramme mit Mermaid.

## C4 Context Diagramm (Level 1)

Das Context-Diagramm zeigt das System im Überblick und seine Beziehungen zu externen Systemen und Benutzern.

```mermaid
C4Context
    title System Context Diagram für Online Banking System

    Person(customer, "Bankkunde", "Ein Kunde der Bank mit persönlichen und geschäftlichen Bankkonten")
    
    System(banking_system, "Online Banking System", "Ermöglicht Kunden das Verwalten ihrer Bankkonten online")
    
    System_Ext(mail_system, "E-Mail System", "Das interne Microsoft Exchange E-Mail System")
    System_Ext(mainframe, "Mainframe Banking System", "Speichert alle Kerninformationen über Kunden, Konten, Transaktionen usw.")
    
    Rel(customer, banking_system, "Verwaltet Bankkonten über", "HTTPS")
    Rel(banking_system, mail_system, "Sendet E-Mails über", "SMTP")
    Rel_Back(banking_system, mainframe, "Liest/schreibt Daten", "XML/HTTPS")
```

## C4 Container Diagramm (Level 2)

Das Container-Diagramm zeigt die Struktur des Systems auf hoher Ebene und die Verteilung der Verantwortlichkeiten.

```mermaid
C4Container
    title Container Diagram für Online Banking System

    Person(customer, "Bankkunde")

    Container_Boundary(c1, "Online Banking System") {
        Container(web_app, "Web Application", "Java, Spring MVC", "Stellt alle Online-Banking-Funktionen über einen Webbrowser bereit")
        Container(spa, "Single-Page App", "JavaScript, Angular", "Stellt alle Online-Banking-Funktionen über einen Webbrowser bereit")
        Container(mobile_app, "Mobile App", "Xamarin", "Stellt eine begrenzte Anzahl von Online-Banking-Funktionen über mobile Geräte bereit")
        Container(api, "API Application", "Java, Spring Boot", "Stellt Online-Banking-Funktionen über eine JSON/HTTPS-API bereit")
        Container(database, "Database", "Oracle Database Schema", "Speichert Benutzerregistrierungen, gehashte Authentifizierungsdaten, Zugriffsprotokolle usw.")
    }

    System_Ext(mail_system, "E-Mail System")
    System_Ext(mainframe, "Mainframe Banking System")

    Rel(customer, web_app, "Besucht", "HTTPS")
    Rel(customer, spa, "Besucht", "HTTPS")
    Rel(customer, mobile_app, "Verwendet")

    Rel(web_app, api, "Macht API-Aufrufe an", "JSON/HTTPS")
    Rel(spa, api, "Macht API-Aufrufe an", "JSON/HTTPS")
    Rel(mobile_app, api, "Macht API-Aufrufe an", "JSON/HTTPS")
    
    Rel(api, database, "Liest/schreibt", "JDBC")
    Rel(api, mail_system, "Sendet E-Mails über", "SMTP")
    Rel(api, mainframe, "Macht API-Aufrufe an", "XML/HTTPS")
```

## C4 Component Diagramm (Level 3)

Das Component-Diagramm zeigt die interne Struktur eines Containers.

```mermaid
C4Component
    title Component Diagram für API Application

    Container(spa, "Single Page Application", "JavaScript und Angular", "Stellt alle Online-Banking-Funktionen über einen Webbrowser bereit")
    Container(ma, "Mobile App", "Xamarin", "Stellt eine begrenzte Anzahl von Online-Banking-Funktionen über mobile Geräte bereit")
    Container(db, "Database", "Relational Database Schema", "Speichert Benutzerregistrierungen, gehashte Authentifizierungsdaten usw.")

    Container_Boundary(api, "API Application") {
        Component(sign_in, "Sign In Controller", "MVC Rest Controller", "Ermöglicht Benutzern die Anmeldung im Online-Banking-System")
        Component(accounts, "Accounts Summary Controller", "MVC Rest Controller", "Stellt Kunden eine Zusammenfassung ihrer Bankkonten zur Verfügung")
        Component(security, "Security Component", "Spring Bean", "Stellt Funktionalität im Zusammenhang mit der Anmeldung, Registrierung, Passwort-Änderung usw. bereit")
        Component(mbsfacade, "Mainframe Banking System Facade", "Spring Bean", "Eine Facade für das Mainframe Banking System")
        Component(email, "E-mail Component", "Spring Bean", "Sendet E-Mails an Benutzer")
    }

    System_Ext(mbs, "Mainframe Banking System", "Speichert alle Kerninformationen über Kunden, Konten, Transaktionen usw.")
    System_Ext(email_system, "E-Mail System", "Das interne Microsoft Exchange E-Mail System")

    Rel(spa, sign_in, "Macht API-Aufrufe an", "JSON/HTTPS")
    Rel(spa, accounts, "Macht API-Aufrufe an", "JSON/HTTPS")
    Rel(ma, sign_in, "Macht API-Aufrufe an", "JSON/HTTPS")
    Rel(ma, accounts, "Macht API-Aufrufe an", "JSON/HTTPS")

    Rel(sign_in, security, "Verwendet")
    Rel(accounts, mbsfacade, "Verwendet")
    Rel(security, db, "Liest/schreibt Benutzerdaten", "JDBC")
    Rel(security, email, "Sendet Passwort-Reset-E-Mails über")
    Rel(mbsfacade, mbs, "Macht API-Aufrufe an", "XML/HTTPS")
    Rel(email, email_system, "Sendet E-Mails über", "SMTP")
```

## Microservices Architektur Beispiel

Ein weiteres Beispiel zeigt eine moderne Microservices-Architektur:

```mermaid
C4Container
    title Microservices E-Commerce Platform

    Person(customer, "Kunde", "Online-Shopper")
    Person(admin, "Administrator", "System-Administrator")

    System_Boundary(ecommerce, "E-Commerce Platform") {
        Container(web_app, "Web Shop", "React/TypeScript", "Online-Shop Frontend")
        Container(api_gateway, "API Gateway", "Kong/Nginx", "API-Gateway und Load Balancer")
        
        Container(user_service, "User Service", "Node.js/Express", "Benutzerverwaltung und Authentifizierung")
        Container(product_service, "Product Service", "Java/Spring Boot", "Produktkatalog und Inventar")
        Container(order_service, "Order Service", "Python/FastAPI", "Bestellabwicklung")
        Container(payment_service, "Payment Service", "Go/Gin", "Zahlungsabwicklung")
        Container(notification_service, "Notification Service", "Node.js", "E-Mail und Push-Benachrichtigungen")
        
        ContainerDb(user_db, "User DB", "PostgreSQL", "Benutzerdaten")
        ContainerDb(product_db, "Product DB", "MongoDB", "Produktdaten")
        ContainerDb(order_db, "Order DB", "PostgreSQL", "Bestelldaten")
        ContainerQueue(message_queue, "Message Queue", "RabbitMQ", "Asynchrone Kommunikation")
    }

    System_Ext(payment_provider, "Payment Provider", "Stripe/PayPal")
    System_Ext(email_service, "E-Mail Service", "SendGrid")

    Rel(customer, web_app, "Verwendet", "HTTPS")
    Rel(admin, web_app, "Verwaltet", "HTTPS")
    
    Rel(web_app, api_gateway, "API-Aufrufe", "HTTPS")
    Rel(api_gateway, user_service, "Weiterleitung", "HTTP")
    Rel(api_gateway, product_service, "Weiterleitung", "HTTP")
    Rel(api_gateway, order_service, "Weiterleitung", "HTTP")
    Rel(api_gateway, payment_service, "Weiterleitung", "HTTP")
    
    Rel(user_service, user_db, "CRUD", "SQL")
    Rel(product_service, product_db, "CRUD", "MongoDB Protocol")
    Rel(order_service, order_db, "CRUD", "SQL")
    
    Rel(order_service, message_queue, "Publiziert Events", "AMQP")
    Rel(payment_service, message_queue, "Konsumiert Events", "AMQP")
    Rel(notification_service, message_queue, "Konsumiert Events", "AMQP")
    
    Rel(payment_service, payment_provider, "Prozessiert Zahlungen", "HTTPS")
    Rel(notification_service, email_service, "Sendet E-Mails", "HTTPS")
```

## Deployment Diagramm

Ein C4 Deployment-Diagramm zeigt die physische Infrastruktur:

```mermaid
C4Deployment
    title Deployment Diagram für Online Banking System

    Deployment_Node(plc, "Customer's computer", "Microsoft Windows or Apple macOS"){
        Deployment_Node(browser, "Web Browser", "Chrome, Firefox, Safari, or Edge"){
            Container(spa, "Single Page Application", "JavaScript und Angular", "Stellt alle Online-Banking-Funktionen über einen Webbrowser bereit")
        }
    }

    Deployment_Node(mob, "Customer's mobile device", "Apple iOS or Android"){
        Container(mobile, "Mobile App", "Xamarin", "Stellt eine begrenzte Anzahl von Online-Banking-Funktionen über mobile Geräte bereit")
    }

    Deployment_Node(amazon, "Amazon Web Services", ""){
        Deployment_Node(aws_region, "US-East-1", ""){
            Deployment_Node(ec2, "Amazon EC2", ""){
                Deployment_Node(apache, "Apache Tomcat", "Apache Tomcat 8.x"){
                    Container(api, "API Application", "Java und Spring Boot", "Stellt Online-Banking-Funktionen über eine JSON/HTTPS-API bereit.")
                }
            }
            Deployment_Node(rds, "Amazon RDS", ""){
                Deployment_Node(oracle, "Oracle 12c", ""){
                    ContainerDb(db, "Database", "Relational Database Schema", "Speichert Benutzerregistrierungen, gehashte Authentifizierungsdaten usw.")
                }
            }
        }
    }

    Deployment_Node(big_bank_plc, "Big Bank plc", "Big Bank plc data center"){
        Deployment_Node(mainframe2, "bigbank-dev001", ""){
            System_Ext(mainframe, "Mainframe Banking System", "Speichert alle Kerninformationen über Kunden, Konten, Transaktionen usw.")
        }
    }

    Rel(spa, api, "Macht API-Aufrufe an", "JSON/HTTPS")
    Rel(mobile, api, "Macht API-Aufrufe an", "JSON/HTTPS")
    Rel(api, db, "Liest/schreibt", "JDBC/SSL")
    Rel(api, mainframe, "Macht API-Aufrufe an", "XML/HTTPS")
```

Diese Beispiele zeigen die verschiedenen Ebenen des C4-Modells und wie sie mit Mermaid dargestellt werden können. Jede Ebene bietet unterschiedliche Detailgrade und richtet sich an verschiedene Zielgruppen.