/*
 * Data Hub Service (DHuS) - For Space data distribution.
 * Copyright (C) 2013,2014,2015 GAEL Systems
 *
 * This file is part of DHuS software sources.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
package fr.gael.dhus.html;

//import fr.gael.dhus.gwt.services.annotation.RPCService;
import fr.gael.dhus.server.http.web.WebApplication;
import fr.gael.dhus.server.http.web.WebComponent;
import fr.gael.dhus.server.http.web.WebServlet;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.core.type.filter.AnnotationTypeFilter;

import javax.servlet.Servlet;
import java.io.InputStream;
import java.util.ArrayList;

@WebComponent
public class GUIWebapp extends WebApplication
{
   private static Log logger = LogFactory.getLog (GUIWebapp.class);

   @Override
   public void init ()
   {
      this.name = "gui";
      this.servlets = new ArrayList<WebServlet> ();
      this.welcomeFiles = new ArrayList<String> ();

      servlets.add (new GUIClientWebServlet ("gui", "/gui"));
      welcomeFiles.add ("gui");

/*
      ClassPathScanningCandidateComponentProvider scan =
         new ClassPathScanningCandidateComponentProvider (false);
      scan.addIncludeFilter (new AnnotationTypeFilter (RPCService.class));*/

   }
/*
   private class RPCServlet extends WebServlet
   {
      protected RPCServlet (Servlet servlet, String servletName,
         String urlPattern)
      {
         this.servlet = servlet;
         this.servletName = servletName;
         this.urlPattern = urlPattern;
      }
   }*/

   private class GUIClientWebServlet extends WebServlet
   {
      protected GUIClientWebServlet (String servletName, String urlPattern)
      {
         this.servlet = new GUIClientServlet();
         this.servletName = servletName;
         this.urlPattern = urlPattern;
      }
   }


   @Override
   public InputStream getWarStream ()
   {
      return GUIWebapp.class.getClassLoader ().getResourceAsStream (
         "dhus-html-client.war");
   }
}
