CREATE TABLE `school_deadlines` (
	`id` int AUTO_INCREMENT NOT NULL,
	`schoolNameEn` varchar(255) NOT NULL,
	`schoolNameZh` varchar(255),
	`schoolId` varchar(64),
	`category` varchar(64),
	`stage` varchar(64),
	`academicYear` varchar(16) NOT NULL,
	`eventType` varchar(64) NOT NULL,
	`startDate` date,
	`endDate` date,
	`isRolling` boolean DEFAULT false,
	`sourceUrl` text,
	`notes` text,
	`status` enum('ok','needs_manual','fetch_error') DEFAULT 'ok',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `school_deadlines_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `unmatched_schools_log` (
	`id` int AUTO_INCREMENT NOT NULL,
	`schoolNameEn` varchar(255) NOT NULL,
	`schoolNameZh` varchar(255),
	`sourceFile` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `unmatched_schools_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_tracked_schools` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`schoolId` varchar(64) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_tracked_schools_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_school_unique` UNIQUE(`userId`,`schoolId`)
);
