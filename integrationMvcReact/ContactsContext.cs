using System.Data.Entity.ModelConfiguration.Conventions;
using Microsoft.EntityFrameworkCore;

namespace integrationMvcReact
{
    public class ContactsContext: DbContext
    {
        public ContactsContext(DbContextOptions<ContactsContext> options) : base(options) { }

        internal virtual DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            var contactTable = modelBuilder.Entity<Contact>();

            contactTable.HasKey(e => e.Id);
            contactTable.ToTable("Contacts");

            contactTable.Property(e => e.Id)
                .HasColumnName("Id")
                .HasColumnType("bigint");

            contactTable.Property(e => e.FirstName)
                .HasColumnName("FirstName")
                .HasColumnType("text");

            contactTable.Property(e => e.LastName)
                .HasColumnName("LastName")
                .HasColumnType("text");

            contactTable.Property(e => e.Email)
                .HasColumnName("Email")
                .HasColumnType("text");

            contactTable.Property(e => e.PhoneNumber)
                .HasColumnName("PhoneNumber")
                .HasColumnType("text");
        }


    }
}
