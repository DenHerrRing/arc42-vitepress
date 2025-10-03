# Mermaid C4 Diagram Examples

This document shows various examples of C4 diagrams using Mermaid.

## C4 Context Diagram (Level 1)

The Context diagram shows the system overview and its relationships to external systems and users.

```mermaid
C4Context
    title System Context Diagram for Online Banking System

    Person(customer, "Bank Customer", "A customer of the bank with personal and business bank accounts")
    
    System(banking_system, "Online Banking System", "Allows customers to manage their bank accounts online")
    
    System_Ext(mail_system, "E-Mail System", "The internal Microsoft Exchange email system")
    System_Ext(mainframe, "Mainframe Banking System", "Stores all core information about customers, accounts, transactions, etc.")
    
    Rel(customer, banking_system, "Manages bank accounts via", "HTTPS")
    Rel(banking_system, mail_system, "Sends emails via", "SMTP")
    Rel_Back(banking_system, mainframe, "Reads/writes data", "XML/HTTPS")
```

## C4 Container Diagram (Level 2)

The Container diagram shows the high-level structure of the system and the distribution of responsibilities.

```mermaid
C4Container
    title Container Diagram for Online Banking System

    Person(customer, "Bank Customer")

    Container_Boundary(c1, "Online Banking System") {
        Container(web_app, "Web Application", "Java, Spring MVC", "Provides all online banking functionality via a web browser")
        Container(spa, "Single-Page App", "JavaScript, Angular", "Provides all online banking functionality via a web browser")
        Container(mobile_app, "Mobile App", "Xamarin", "Provides a limited set of online banking functionality via mobile devices")
        Container(api, "API Application", "Java, Spring Boot", "Provides online banking functionality via a JSON/HTTPS API")
        Container(database, "Database", "Oracle Database Schema", "Stores user registrations, hashed authentication credentials, access logs, etc.")
    }

    System_Ext(mail_system, "E-Mail System")
    System_Ext(mainframe, "Mainframe Banking System")

    Rel(customer, web_app, "Visits", "HTTPS")
    Rel(customer, spa, "Visits", "HTTPS")
    Rel(customer, mobile_app, "Uses")

    Rel(web_app, api, "Makes API calls to", "JSON/HTTPS")
    Rel(spa, api, "Makes API calls to", "JSON/HTTPS")
    Rel(mobile_app, api, "Makes API calls to", "JSON/HTTPS")
    
    Rel(api, database, "Reads/writes", "JDBC")
    Rel(api, mail_system, "Sends emails via", "SMTP")
    Rel(api, mainframe, "Makes API calls to", "XML/HTTPS")
```

## C4 Component Diagram (Level 3)

The Component diagram shows the internal structure of a container.

```mermaid
C4Component
    title Component Diagram for API Application

    Container(spa, "Single Page Application", "JavaScript and Angular", "Provides all online banking functionality via a web browser")
    Container(ma, "Mobile App", "Xamarin", "Provides a limited set of online banking functionality via mobile devices")
    Container(db, "Database", "Relational Database Schema", "Stores user registrations, hashed authentication credentials, etc.")

    Container_Boundary(api, "API Application") {
        Component(sign_in, "Sign In Controller", "MVC Rest Controller", "Allows users to sign in to the online banking system")
        Component(accounts, "Accounts Summary Controller", "MVC Rest Controller", "Provides customers with a summary of their bank accounts")
        Component(security, "Security Component", "Spring Bean", "Provides functionality related to signing in, registration, password changes, etc.")
        Component(mbsfacade, "Mainframe Banking System Facade", "Spring Bean", "A facade onto the mainframe banking system")
        Component(email, "E-mail Component", "Spring Bean", "Sends emails to users")
    }

    System_Ext(mbs, "Mainframe Banking System", "Stores all core information about customers, accounts, transactions, etc.")
    System_Ext(email_system, "E-Mail System", "The internal Microsoft Exchange email system")

    Rel(spa, sign_in, "Makes API calls to", "JSON/HTTPS")
    Rel(spa, accounts, "Makes API calls to", "JSON/HTTPS")
    Rel(ma, sign_in, "Makes API calls to", "JSON/HTTPS")
    Rel(ma, accounts, "Makes API calls to", "JSON/HTTPS")

    Rel(sign_in, security, "Uses")
    Rel(accounts, mbsfacade, "Uses")
    Rel(security, db, "Reads/writes user data", "JDBC")
    Rel(security, email, "Sends password reset emails via")
    Rel(mbsfacade, mbs, "Makes API calls to", "XML/HTTPS")
    Rel(email, email_system, "Sends emails via", "SMTP")
```

## Microservices Architecture Example

Another example shows a modern microservices architecture:

```mermaid
C4Container
    title Microservices E-Commerce Platform

    Person(customer, "Customer", "Online Shopper")
    Person(admin, "Administrator", "System Administrator")

    System_Boundary(ecommerce, "E-Commerce Platform") {
        Container(web_app, "Web Shop", "React/TypeScript", "Online shop frontend")
        Container(api_gateway, "API Gateway", "Kong/Nginx", "API gateway and load balancer")
        
        Container(user_service, "User Service", "Node.js/Express", "User management and authentication")
        Container(product_service, "Product Service", "Java/Spring Boot", "Product catalog and inventory")
        Container(order_service, "Order Service", "Python/FastAPI", "Order processing")
        Container(payment_service, "Payment Service", "Go/Gin", "Payment processing")
        Container(notification_service, "Notification Service", "Node.js", "Email and push notifications")
        
        ContainerDb(user_db, "User DB", "PostgreSQL", "User data")
        ContainerDb(product_db, "Product DB", "MongoDB", "Product data")
        ContainerDb(order_db, "Order DB", "PostgreSQL", "Order data")
        ContainerQueue(message_queue, "Message Queue", "RabbitMQ", "Asynchronous communication")
    }

    System_Ext(payment_provider, "Payment Provider", "Stripe/PayPal")
    System_Ext(email_service, "E-Mail Service", "SendGrid")

    Rel(customer, web_app, "Uses", "HTTPS")
    Rel(admin, web_app, "Manages", "HTTPS")
    
    Rel(web_app, api_gateway, "API calls", "HTTPS")
    Rel(api_gateway, user_service, "Routes to", "HTTP")
    Rel(api_gateway, product_service, "Routes to", "HTTP")
    Rel(api_gateway, order_service, "Routes to", "HTTP")
    Rel(api_gateway, payment_service, "Routes to", "HTTP")
    
    Rel(user_service, user_db, "CRUD", "SQL")
    Rel(product_service, product_db, "CRUD", "MongoDB Protocol")
    Rel(order_service, order_db, "CRUD", "SQL")
    
    Rel(order_service, message_queue, "Publishes events", "AMQP")
    Rel(payment_service, message_queue, "Consumes events", "AMQP")
    Rel(notification_service, message_queue, "Consumes events", "AMQP")
    
    Rel(payment_service, payment_provider, "Processes payments", "HTTPS")
    Rel(notification_service, email_service, "Sends emails", "HTTPS")
```

## Deployment Diagram

A C4 Deployment diagram shows the physical infrastructure:

```mermaid
C4Deployment
    title Deployment Diagram for Online Banking System

    Deployment_Node(plc, "Customer's computer", "Microsoft Windows or Apple macOS"){
        Deployment_Node(browser, "Web Browser", "Chrome, Firefox, Safari, or Edge"){
            Container(spa, "Single Page Application", "JavaScript and Angular", "Provides all online banking functionality via a web browser")
        }
    }

    Deployment_Node(mob, "Customer's mobile device", "Apple iOS or Android"){
        Container(mobile, "Mobile App", "Xamarin", "Provides a limited set of online banking functionality via mobile devices")
    }

    Deployment_Node(amazon, "Amazon Web Services", ""){
        Deployment_Node(aws_region, "US-East-1", ""){
            Deployment_Node(ec2, "Amazon EC2", ""){
                Deployment_Node(apache, "Apache Tomcat", "Apache Tomcat 8.x"){
                    Container(api, "API Application", "Java and Spring Boot", "Provides online banking functionality via a JSON/HTTPS API.")
                }
            }
            Deployment_Node(rds, "Amazon RDS", ""){
                Deployment_Node(oracle, "Oracle 12c", ""){
                    ContainerDb(db, "Database", "Relational Database Schema", "Stores user registrations, hashed authentication credentials, etc.")
                }
            }
        }
    }

    Deployment_Node(big_bank_plc, "Big Bank plc", "Big Bank plc data center"){
        Deployment_Node(mainframe2, "bigbank-dev001", ""){
            System_Ext(mainframe, "Mainframe Banking System", "Stores all core information about customers, accounts, transactions, etc.")
        }
    }

    Rel(spa, api, "Makes API calls to", "JSON/HTTPS")
    Rel(mobile, api, "Makes API calls to", "JSON/HTTPS")
    Rel(api, db, "Reads/writes", "JDBC/SSL")
    Rel(api, mainframe, "Makes API calls to", "XML/HTTPS")
```

These examples show the different levels of the C4 model and how they can be represented with Mermaid. Each level offers different levels of detail and targets different audiences.