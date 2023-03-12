﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Models;

namespace Company.Migrations
{
    [DbContext(typeof(Context))]
    [Migration("20230311160728_V4")]
    partial class V4
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("Models.Employee", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("DateOfBirth")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("MonthSalary")
                        .HasColumnType("real");

                    b.Property<int>("PhoneNumber")
                        .HasColumnType("int");

                    b.Property<int?>("SectorID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("SectorID");

                    b.ToTable("Employee");
                });

            modelBuilder.Entity("Models.Sector", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Sector");
                });

            modelBuilder.Entity("Models.Task_X", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int?>("AssigneeID")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DuoDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("AssigneeID");

                    b.ToTable("Task_X");
                });

            modelBuilder.Entity("Models.Employee", b =>
                {
                    b.HasOne("Models.Sector", "Sector")
                        .WithMany("Employees")
                        .HasForeignKey("SectorID");

                    b.Navigation("Sector");
                });

            modelBuilder.Entity("Models.Task_X", b =>
                {
                    b.HasOne("Models.Employee", "Assignee")
                        .WithMany("TasksOfTheEmployee")
                        .HasForeignKey("AssigneeID");

                    b.Navigation("Assignee");
                });

            modelBuilder.Entity("Models.Employee", b =>
                {
                    b.Navigation("TasksOfTheEmployee");
                });

            modelBuilder.Entity("Models.Sector", b =>
                {
                    b.Navigation("Employees");
                });
#pragma warning restore 612, 618
        }
    }
}